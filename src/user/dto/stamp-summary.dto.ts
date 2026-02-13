export class LandmarkDetail {
  /** 랜드마크 ID */
  landmarkId: number;

  /** 랜드마크 명칭 */
  title: string;

  /** 이미지 URL (없을 경우 null) */
  image: string | null;

  /** 획득 일시 */
  obtainedAt: string;
}

export class StampSummaryDto {
  /** 총 스탬프 개수 */
  totalCount: number;

  /** 획득한 랜드마크 목록 */
  landmarks: LandmarkDetail[];
}
