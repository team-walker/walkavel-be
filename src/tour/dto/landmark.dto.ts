export class LandmarkDto {
  /** Content ID.
   * @example 126508
   */
  contentid: number;
  /** Content type ID.
   * @example 12
   */
  contenttypeid?: number | null;
  /** Landmark title.
   * @example "Gyeongbokgung Palace"
   */
  title: string;
  /** Primary address. */
  addr1?: string | null;
  /** Secondary address. */
  addr2?: string | null;
  /** Zip code. */
  zipcode?: string | null;
  /** Contact phone number. */
  tel?: string | null;
  /** Area code. */
  areacode?: number | null;
  /** Sigungu code. */
  sigungucode?: number | null;
  /** Category level 1 code. */
  cat1?: string | null;
  /** Category level 2 code. */
  cat2?: string | null;
  /** Category level 3 code. */
  cat3?: string | null;
  /** Map X coordinate (longitude). */
  mapx?: number | null;
  /** Map Y coordinate (latitude). */
  mapy?: number | null;
  /** Map level. */
  mlevel?: number | null;
  /** Primary image URL. */
  firstimage?: string | null;
  /** Secondary image URL. */
  firstimage2?: string | null;
  /** Copyright division code. */
  cpyrhtdivcd?: string | null;
  /** Created timestamp from source API. */
  createdtime?: string | null;
  /** Modified timestamp from source API. */
  modifiedtime?: string | null;
  /** Legal district region code. */
  ldongregncd?: number | null;
  /** Legal district sigungu code. */
  ldongsigngucd?: number | null;
  /** Classification system level 1. */
  lclssystm1?: string | null;
  /** Classification system level 2. */
  lclssystm2?: string | null;
  /** Classification system level 3. */
  lclssystm3?: string | null;
}
