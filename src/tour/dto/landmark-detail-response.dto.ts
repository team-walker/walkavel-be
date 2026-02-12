export class LandmarkDetailDto {
  /** Content ID.
   * @example 126508
   */
  contentid: number;
  /** Content type ID. */
  contenttypeid?: number | null;
  /** Landmark title. */
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
  /** Homepage URL. */
  homepage?: string | null;
  /** Detailed overview text. */
  overview?: string | null;
}

export class LandmarkImageDto {
  /** Content ID.
   * @example 126508
   */
  contentid: number;
  /** Original image URL. */
  originimgurl: string;
  /** Image name. */
  imgname: string;
  /** Thumbnail image URL. */
  smallimageurl?: string | null;
  /** Copyright division code. */
  cpyrhtdivcd?: string | null;
  /** Image serial number. */
  serialnum?: string | null;
}

export class LandmarkIntroDto {
  /** Content ID.
   * @example 126508
   */
  contentid: number;
  /** Content type ID.
   * @example 12
   */
  contenttypeid: number;
  /** Cultural heritage flag 1. */
  heritage1?: boolean | null;
  /** Cultural heritage flag 2. */
  heritage2?: boolean | null;
  /** Cultural heritage flag 3. */
  heritage3?: boolean | null;
  /** Information center details. */
  infocenter?: string | null;
  /** Opening date. */
  opendate?: string | null;
  /** Closed date information. */
  restdate?: string | null;
  /** Experience guide. */
  expguide?: string | null;
  /** Recommended age range. */
  expagerange?: string | null;
  /** Accommodation count or capacity text. */
  accomcount?: string | null;
  /** Recommended season. */
  useseason?: string | null;
  /** Operating hours text. */
  usetime?: string | null;
  /** Parking information. */
  parking?: string | null;
  /** Baby carriage availability. */
  chkbabycarriage?: boolean | null;
  /** Pet allowed flag. */
  chkpet?: boolean | null;
  /** Credit card accepted flag. */
  chkcreditcard?: boolean | null;
}

export class LandmarkDetailResponseDto {
  /** Landmark detail payload. */
  detail: LandmarkDetailDto;
  /** Landmark images payload. */
  images: LandmarkImageDto[];
  /** Landmark intro payload. */
  intro?: LandmarkIntroDto | null;
  /** Whether the current user already acquired this stamp.
   * @example false
   */
  isStamped: boolean;
}
