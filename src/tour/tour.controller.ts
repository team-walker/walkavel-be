import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@supabase/supabase-js';

import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { OptionalAuthGuard } from '../auth/optional-auth.guard';
import { CreateStampDto } from './dto/create-stamp.dto';
import { LandmarkDto } from './dto/landmark.dto';
import { LandmarkDetailResponseDto } from './dto/landmark-detail-response.dto';
import { StampResponseDto } from './dto/stamp-response.dto';
import { SyncTourDetailResponseDto, SyncTourResponseDto } from './dto/sync-tour-response.dto';
import { TourService } from './tour.service';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  /**
   * 스탬프 찍기
   */
  @Post('landmarks/stamps')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: '이미 스탬프를 보유하고 있거나 잘못된 요청입니다.' })
  @ApiNotFoundResponse({ description: '해당 랜드마크를 찾을 수 없습니다.' })
  async createStamp(
    @Req() req: RequestWithUser,
    @Body() createStampDto: CreateStampDto,
  ): Promise<StampResponseDto> {
    return this.tourService.createStamp(req.user.id, createStampDto.landmarkId);
  }

  @Post('sync')
  @ApiExcludeEndpoint()
  async syncAllLandmarks() {
    return this.tourService.syncAllLandmarkData();
  }

  @Post('sync/list')
  @ApiExcludeEndpoint()
  async syncLandmarkList() {
    return this.tourService.syncLandmarkList();
  }

  @Post('sync/detail')
  @ApiExcludeEndpoint()
  async syncLandmarkDetail(): Promise<SyncTourDetailResponseDto> {
    const updatedIds = await this.tourService.syncLandmarkDetails();
    return {
      success: true,
      message: 'Landmark details synchronization completed',
      updatedCount: updatedIds?.length ?? 0,
      updatedIds,
    };
  }

  @Post('sync/image')
  @ApiExcludeEndpoint()
  async syncLandmarkImage(): Promise<SyncTourResponseDto> {
    await this.tourService.syncLandmarkImages();
    return {
      success: true,
      message: 'Landmark images synchronization completed',
    };
  }

  @Post('sync/intro')
  @ApiExcludeEndpoint()
  async syncLandmarkIntro(): Promise<SyncTourResponseDto> {
    await this.tourService.syncLandmarkIntros();
    return {
      success: true,
      message: 'Landmark intro synchronization completed',
    };
  }

  @Post('sync/region-map')
  @ApiExcludeEndpoint()
  async syncRegionMap() {
    return await this.tourService.syncRegionSigunguMap();
  }

  /**
   * 지역별 랜드마크 목록 조회
   */
  @Get('landmarks/by-region')
  @ApiBadRequestResponse({ description: '시/도 및 시/군/구 정보가 필요합니다.' })
  @ApiNotFoundResponse({ description: '해당 지역 매핑을 찾을 수 없습니다.' })
  async getLandmarksByRegion(
    @Query('sido') sido: string,
    @Query('sigugun') sigugun: string,
  ): Promise<LandmarkDto[]> {
    return await this.tourService.getLandmarksByRegionNames(sido, sigugun);
  }

  /**
   * 랜드마크 상세 정보 조회
   */
  @Get('landmarks/:contentId')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'contentId는 양의 정수여야 합니다.' })
  @ApiNotFoundResponse({ description: '해당 랜드마크를 찾을 수 없습니다.' })
  async getLandmarkDetail(
    @Param('contentId', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    contentId: number,
    @Req() req: { user?: User },
  ): Promise<LandmarkDetailResponseDto> {
    return this.tourService.getLandmarkDetail(contentId, req.user?.id);
  }

  /**
   * 전체 랜드마크 목록 조회
   */
  @Get()
  async getLandmarks() {
    return this.tourService.getLandmarks();
  }
}
