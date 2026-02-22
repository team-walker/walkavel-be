export class RegionTokenDto {
  /**
   * 지역 코드
   * @example ""
   */
  code?: string;

  /**
   * 전체 지역명
   * @example "서울특별시"
   */
  longName: string;

  /**
   * 축약 지역명
   * @example "서울특별시"
   */
  shortName: string;

  /**
   * 지역 유형
   * @example ["SIDO"]
   */
  types: string[];
}

export class LandmarksByRegionRequestDto {
  /**
   * 지역 목록
   */
  regions: RegionTokenDto[];
}
