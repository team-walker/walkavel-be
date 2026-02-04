import { Controller, Get, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { SyncTourDetailResponseDto, SyncTourResponseDto } from './dto/sync-tour-response.dto';
import { TourService } from './tour.service';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post('sync')
  async syncTourData() {
    return this.tourService.syncAllTourData();
  }

  @Post('sync/list')
  async syncTourList() {
    return this.tourService.syncTourData();
  }

  @Post('sync/detail')
  @ApiResponse({ type: SyncTourDetailResponseDto })
  async syncTourDetail(): Promise<SyncTourDetailResponseDto> {
    const updatedIds = await this.tourService.syncLandmarkDetails();
    return {
      success: true,
      message: 'Landmark details synchronization completed',
      updatedCount: updatedIds?.length ?? 0,
      updatedIds,
    };
  }

  @Post('sync/image')
  @ApiResponse({ type: SyncTourResponseDto })
  async syncTourImage(): Promise<SyncTourResponseDto> {
    await this.tourService.syncLandmarkImages();
    return {
      success: true,
      message: 'Landmark images synchronization completed',
    };
  }

  @Post('sync/intro')
  @ApiResponse({ type: SyncTourResponseDto })
  async syncTourIntro(): Promise<SyncTourResponseDto> {
    await this.tourService.syncLandmarkIntros();
    return {
      success: true,
      message: 'Landmark intro synchronization completed',
    };
  }

  @Get()
  async getTourData() {
    return this.tourService.getLandmarks();
  }
}
