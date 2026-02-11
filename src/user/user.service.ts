import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { SupabaseService } from '../supabase/supabase.service';
import { StampSummaryDto } from './dto/stamp-summary.dto';
import { StampRow } from './interfaces/stamp-row.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly supabaseService: SupabaseService) {}

  async getStampSummary(userId: string): Promise<StampSummaryDto> {
    const supabase = this.supabaseService.getClient();

    const { data, error, count } = await supabase
      .from('stamps')
      .select(
        `
        landmark_id,
        created_at,
        landmark:landmark_id (title, firstimage)
      `,
        { count: 'exact' },
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .returns<StampRow[]>();

    if (error) {
      this.logger.error(`조회 실패: ${error.message}`);
      throw new InternalServerErrorException('DB 조회 오류');
    }

    const landmarks = (data || []).map((item: StampRow) => ({
      landmark_id: item.landmark_id,
      title: item.landmark?.title ?? '이름 없음',
      image: item.landmark?.firstimage ?? null,
      obtained_at: item.created_at,
    }));

    return { totalCount: count || 0, landmarks };
  }
}
