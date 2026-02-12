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
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { CreateStampDto } from './dto/create-stamp.dto';
import { LandmarkDto } from './dto/landmark.dto';
import { LandmarkDetailResponseDto } from './dto/landmark-detail-response.dto';
import { SyncTourDetailResponseDto, SyncTourResponseDto } from './dto/sync-tour-response.dto';
import { TourService } from './tour.service';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post('stamps')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '스탬프 찍기' })
  @ApiResponse({ status: 201, description: '스탬프 생성 성공' })
  @ApiBadRequestResponse({ description: '이미 스탬프를 보유하고 있거나 잘못된 요청' })
  @ApiNotFoundResponse({ description: '랜드마크를 찾을 수 없음' })
  async createStamp(@Req() req: RequestWithUser, @Body() createStampDto: CreateStampDto) {
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

  @Get('landmarks/by-region')
  @ApiResponse({ type: LandmarkDto, isArray: true })
  @ApiBadRequestResponse({ description: 'sido and sigugun are required' })
  @ApiNotFoundResponse({ description: 'No region mapping found for the provided SIDO/SIGUGUN' })
  async getLandmarksByRegion(@Query('sido') sido: string, @Query('sigugun') sigugun: string) {
    return await this.tourService.getLandmarksByRegionNames(sido, sigugun);
  }

  @Get('landmarks/:contentId')
  @ApiResponse({ type: LandmarkDetailResponseDto })
  @ApiBadRequestResponse({ description: 'contentId must be a positive integer' })
  @ApiNotFoundResponse({ description: 'Landmark not found' })
  async getLandmarkDetail(
    @Param('contentId', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    contentId: number,
  ) {
    return this.tourService.getLandmarkDetail(contentId);
  }

  @Get()
  async getLandmarks() {
    return this.tourService.getLandmarks();
  }
}
