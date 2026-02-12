export class RegionTokenDto {
  /** @example '' */
  code?: string;

  /** @example '서울특별시' */
  longName: string;

  /** @example '서울특별시' */
  shortName: string;

  /** @example ["SIDO"] */
  types: string[];
}

export class LandmarksByRegionRequestDto {
  regions: RegionTokenDto[];
}
