export class LandmarkDetail {
  /**
   * 랜드마크 ID
   * @example 126508
   */
  landmarkId: number;

  /**
   * 제목
   * @example "가야산"
   */
  title: string;

  /**
   * 이미지 URL
   * @example "http://tong.visitkorea.or.kr/cms/resource/12/2619112_image2_1.jpg"
   */
  image: string | null;

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
