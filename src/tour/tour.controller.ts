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
import { LandmarkDetailResponseDto } from './dto/landmark-detail-response.dto';
import { TourService } from './tour.service';

@ApiTags('tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @ApiOperation({ summary: '관광 데이터 전체 동기화' })
  @Post('sync')
  async syncTourData() {
    return await this.tourService.syncAllTourData();
  }

  @ApiOperation({ summary: '관광지 목록 동기화' })
  @Post('sync/list')
  async syncTourList() {
    return await this.tourService.syncTourData();
  }

  @ApiOperation({ summary: '시도/시군구 이름으로 랜드마크 목록 조회 (비로그인)' })
  @ApiQuery({ name: 'sido', required: true, example: '서울특별시' })
  @ApiQuery({ name: 'sigugun', required: true, example: '중구' })
  @ApiOkResponse({ type: LandmarkDto, isArray: true })
  @ApiBadRequestResponse({ description: 'sido and sigugun are required' })
  @ApiNotFoundResponse({ description: 'No region mapping found for the provided SIDO/SIGUGUN' })
  @Get('landmarks/by-region')
  async getLandmarksByRegion(@Query('sido') sido: string, @Query('sigugun') sigugun: string) {
    return await this.tourService.getLandmarksByRegionNames(sido, sigugun);
  }

  @ApiOperation({ summary: '랜드마크 상세 조회 (비로그인)' })
  @ApiParam({
    name: 'contentId',
    description: '랜드마크 contentid',
    example: 12345,
  })
  @ApiOkResponse({ type: LandmarkDetailResponseDto })
  @ApiBadRequestResponse({ description: 'contentId must be a positive integer' })
  @ApiNotFoundResponse({ description: 'Landmark not found' })
  @Get('landmarks/:contentId')
  async getLandmarkDetail(
    @Param('contentId', new ParseIntPipe({ errorHttpStatusCode: 400 }))
    contentId: number,
  ) {
    return this.tourService.getLandmarkDetail(contentId);
  }

  @ApiOperation({ summary: '관광지 상세 정보 동기화' })
  @Post('sync/detail')
  async syncTourDetail() {
    await this.tourService.syncLandmarkDetails();
    return {
      success: true,
      message: 'Landmark details synchronization completed',
    };
  }

  @ApiOperation({ summary: '관광지 이미지 동기화' })
  @Post('sync/image')
  async syncTourImage() {
    await this.tourService.syncLandmarkImages();
    return {
      success: true,
      message: 'Landmark images synchronization completed',
    };
  }

  @ApiOperation({ summary: '관광지 소개 정보 동기화' })
  @Post('sync/intro')
  async syncTourIntro() {
    await this.tourService.syncLandmarkIntros();
    return {
      success: true,
      message: 'Landmark intro synchronization completed',
    };
  }

  @ApiOperation({ summary: '시군구 코드 매핑 동기화' })
  @Post('sync/region-map')
  async syncRegionMap() {
    return await this.tourService.syncRegionSigunguMap();
  }

  @ApiOperation({ summary: '랜드마크 전체 목록 조회' })
  @Get()
  async getTourData() {
    return await this.tourService.getLandmarks();
  }
}
