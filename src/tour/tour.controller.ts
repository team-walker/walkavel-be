import { Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { LandmarkDto } from './dto/landmark.dto';
import { TourService } from './tour.service';

@ApiTags('tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post('sync')
  async syncTourData() {
    return await this.tourService.syncAllTourData();
  }

  @Post('sync/list')
  async syncTourList() {
    return await this.tourService.syncTourData();
  }

  @Post('sync/detail')
  async syncTourDetail() {
    await this.tourService.syncLandmarkDetails();
    return {
      success: true,
      message: 'Landmark details synchronization completed',
    };
  }

  @Post('sync/image')
  async syncTourImage() {
    await this.tourService.syncLandmarkImages();
    return {
      success: true,
      message: 'Landmark images synchronization completed',
    };
  }

  @Post('sync/intro')
  async syncTourIntro() {
    await this.tourService.syncLandmarkIntros();
    return {
      success: true,
      message: 'Landmark intro synchronization completed',
    };
  }

  @ApiOperation({ summary: '지역별 랜드마크 목록 조회 (비로그인)' })
  @ApiQuery({
    name: 'sigunguCode',
    description: '시군구 코드',
    required: true,
    example: 1,
  })
  @ApiOkResponse({ type: LandmarkDto, isArray: true })
  @ApiBadRequestResponse({ description: 'sigunguCode must be a positive integer' })
  @Get('landmarks')
  async getLandmarksBySigungu(
    @Query('sigunguCode', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    sigunguCode: number,
  ) {
    return await this.tourService.getLandmarksBySigungu(sigunguCode);
  }

  @ApiOperation({ summary: '랜드마크 상세 조회 (비로그인)' })
  @ApiParam({
    name: 'contentId',
    description: '랜드마크 contentid',
    example: 12345,
  })
  @ApiOkResponse({ type: LandmarkDto })
  @ApiBadRequestResponse({ description: 'contentId must be a positive integer' })
  @ApiNotFoundResponse({ description: 'Landmark not found' })
  @Get('landmarks/:contentId')
  async getLandmarkDetail(
    @Param('contentId', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    contentId: number,
  ) {
    return await this.tourService.getLandmarkDetail(contentId);
  }

  @Get()
  async getTourData() {
    return await this.tourService.getLandmarks();
  }
}
