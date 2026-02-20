import { PickType } from '@nestjs/swagger';

import { LandmarkDto } from '../../tour/dto/landmark.dto';

export class LandmarkDetail extends PickType(LandmarkDto, [
  'contentid',
  'title',
  'firstimage',
] as const) {
  /**
   * 획득 일시
   * @example '2026-02-07T10:00:00Z'
   */
  obtainedAt: string;
}

export class StampSummaryDto {
  /**
   * 총 스탬프 개수
   * @example 5
   */
  totalCount: number;

  /**
   * 획득한 랜드마크 목록
   */
  landmarks: LandmarkDetail[];
}
