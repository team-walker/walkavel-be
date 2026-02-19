import { Injectable, Logger } from '@nestjs/common';

import { Database } from '../../database.types';
import { SupabaseService } from '../../supabase/supabase.service';
import { getErrorMessage, logErrorWithContext } from '../../utils/error.util';
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
    const supabase = this.supabaseService.getClient();

    let toSync: { contentid: number }[] = [];

    if (Array.isArray(forceUpdateIds) && forceUpdateIds.length > 0) {
      this.logger.log(`Syncing details for ${forceUpdateIds.length} provided items...`);
      toSync = forceUpdateIds.map((id) => ({ contentid: id }));
    } else {
      const { data: landmarks, error: listError } = await supabase
        .from('landmark_combined')
        .select('contentid, overview');

      if (listError) {
        logErrorWithContext(this.logger, 'Error fetching data for detail sync', listError);
        throw new Error(getErrorMessage(listError));
      }

      toSync = landmarks.filter((l) => !l.overview);
      this.logger.log(
        `Found ${landmarks.length} total landmarks. ${toSync.length} need detail update (missing overview).`,
      );
    }

    if (toSync.length === 0) {
      this.logger.log('All landmark details seem populated.');
      return [];
    }

    this.logger.log(`Starting detailed sync for ${toSync.length} items...`);

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

    // We use 'any' cast here because we are doing a partial update via upsert.
    // We know the contentid exists (from list sync), and we only want to update homepage/overview.
    // However, upsert types require all non-null fields to be present for the potential 'insert' case.
    const updates = batch.map((item) => ({
      contentid: item.contentid,
      homepage: item.homepage,
      overview: item.overview,
      title: item.title,
    }));

    const { error: upsertError } = await supabase
      .from('landmark_combined')
      .upsert(updates as unknown as Database['public']['Tables']['landmark_combined']['Insert'][], {
        onConflict: 'contentid',
      });

    if (upsertError) {
      logErrorWithContext(this.logger, 'Error upserting details', upsertError);
      throw new Error(getErrorMessage(upsertError));
    }
  }
}
