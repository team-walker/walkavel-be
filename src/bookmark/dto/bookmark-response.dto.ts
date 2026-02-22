import { PickType } from '@nestjs/swagger';

import { LandmarkDto } from '../../tour/dto/landmark.dto';

class LandmarkSummaryDto extends PickType(LandmarkDto, [
  'contentid',
  'title',
  'firstimage',
  'addr1',
  'cat1',
  'cat2',
  'cat3',
] as const) {}

export class BookmarkResponseDto {
  /**
   * 북마크 ID
   * @example 1
   */
  id: number;

  /**
   * 사용자 UUID
   * @example 'uuid-1234'
   */
  userId: string;

  /**
   * 콘텐츠 ID
   * @example 126508
   */
  contentId: number;

  /**
   * 생성일
   * @example '2026-02-07T14:30:00Z'
   */
  createdAt: string | null;

  /**
   * 랜드마크 정보
   */
  landmark: LandmarkSummaryDto | null;
}
