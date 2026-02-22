export class LandmarkSummaryDto {
  /** @example 126508 */
  contentId: number;

  /** @example '경복궁' */
  title: string;

  /** @example 'http://...' */
  firstImage: string | null;

  /** @example '서울특별시 종로구...' */
  addr1: string | null;

  /** @example 'A02' */
  cat1: string | null;

  /** @example 'A0201' */
  cat2: string | null;

  /** @example 'A02010100' */
  cat3: string | null;
}
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
