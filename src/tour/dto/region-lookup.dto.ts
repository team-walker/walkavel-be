export class RegionTokenDto {
  /** Administrative region code token.
   * @example "11"
   */
  code?: string;
  /** Full region name.
   * @example "Seoul Special City"
   */
  longName: string;
  /** Short region name.
   * @example "Seoul"
   */
  shortName: string;
  /** Region token types.
   * @example ["SIDO"]
   */
  types: string[];
}

export class LandmarksByRegionRequestDto {
  /** Region tokens used for filtering. */
  regions: RegionTokenDto[];
}
