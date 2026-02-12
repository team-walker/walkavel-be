export class RegionTokenDto {
  code?: string;
  longName: string;
  shortName: string;
  types: string[];
}

export class LandmarksByRegionRequestDto {
  regions: RegionTokenDto[];
}
