export class StampSummaryDto {
  /** 총 스탬프 개수 */
  totalCount: number;

  /** 획득한 랜드마크 리스트 */
  landmarks: LandmarkDetail[];
}

class LandmarkDetail {
  /** 랜드마크 ID */
  landmark_id: number;

  /** 랜드마크 명칭 */
  title: string;

  /** 이미지 URL (null 허용) */
  image: string | null;

  /** 획득 일시 */
  obtained_at: string;
}
