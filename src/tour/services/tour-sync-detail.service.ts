import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { Database } from '../../database.types';
import { SupabaseService } from '../../supabase/supabase.service';
import { logErrorWithContext } from '../../utils/error.util';
import { LandmarkCombinedEntity } from '../interfaces/landmark.interface';
import { TourApiService } from '../tour-api.service';

@Injectable()
export class TourSyncDetailService {
  private readonly logger = new Logger(TourSyncDetailService.name);
  private readonly BATCH_SIZE = 10;
  private readonly API_DELAY = 200;

  constructor(
    private readonly tourApiService: TourApiService,
    private readonly supabaseService: SupabaseService,
  ) {}

  async syncLandmarkDetails(forceUpdateIds?: number[]) {
    if (!forceUpdateIds || forceUpdateIds.length === 0) {
      this.logger.log('No updated items to sync details for. Skipping.');
      return [];
    }

    this.logger.log(
      `Syncing details for ${forceUpdateIds.length} provided items (Forced update)...`,
    );

    const toSync = forceUpdateIds.map((id) => ({ contentid: id }));

    let currentBatch: LandmarkCombinedEntity[] = [];
    let processedCount = 0;
    const processedIds: number[] = [];

    for (const [index, landmark] of toSync.entries()) {
      this.logger.log(
        `[${index + 1}/${toSync.length}] Fetching detail for contentid: ${landmark.contentid}`,
      );

      const detailRecord = await this.tourApiService.fetchLandmarkDetail(landmark.contentid);

      if (detailRecord) {
        currentBatch.push(detailRecord);
        processedIds.push(landmark.contentid);
      } else {
        this.logger.warn(`No details found for contentid: ${landmark.contentid}`);
      }

      await new Promise((resolve) => setTimeout(resolve, this.API_DELAY));

      if (currentBatch.length >= this.BATCH_SIZE) {
        this.logger.log(`Upserting batch of ${currentBatch.length} details...`);
        await this.upsertBatch(currentBatch);
        processedCount += currentBatch.length;
        this.logger.log(`Synced details progress: ${processedCount}/${toSync.length}`);
        currentBatch = [];
      }
    }

    if (currentBatch.length > 0) {
      this.logger.log(`Upserting final batch of ${currentBatch.length} details...`);
      await this.upsertBatch(currentBatch);
      processedCount += currentBatch.length;
      this.logger.log(`Synced all details. Total processed: ${processedCount}`);
    }

    return processedIds;
  }

  private async upsertBatch(batch: LandmarkCombinedEntity[]) {
    const supabase = this.supabaseService.getClient();

    const updates: Database['public']['Tables']['landmark_combined']['Insert'][] = batch.map(
      (item) => ({
        contentid: item.contentid,
        homepage: item.homepage,
        overview: item.overview,
        title: item.title,
      }),
    );

    const { error: upsertError } = await supabase.from('landmark_combined').upsert(updates, {
      onConflict: 'contentid',
    });

    if (upsertError) {
      logErrorWithContext(this.logger, 'Error upserting details', upsertError);
      throw new InternalServerErrorException(`Failed to upsert details: ${upsertError.message}`);
    }
  }
}
