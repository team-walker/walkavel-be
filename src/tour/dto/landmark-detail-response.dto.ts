export class LandmarkDetailDto {
  contentid: number;
  contenttypeid?: number | null;
  title: string;
  addr1?: string | null;
  addr2?: string | null;
  zipcode?: string | null;
  tel?: string | null;
  areacode?: number | null;
  sigungucode?: number | null;
  cat1?: string | null;
  cat2?: string | null;
  cat3?: string | null;
  mapx?: number | null;
  mapy?: number | null;
  mlevel?: number | null;
  firstimage?: string | null;
  firstimage2?: string | null;
  cpyrhtdivcd?: string | null;
  createdtime?: string | null;
  modifiedtime?: string | null;
  ldongregncd?: number | null;
  ldongsigngucd?: number | null;
  lclssystm1?: string | null;
  lclssystm2?: string | null;
  lclssystm3?: string | null;
  homepage?: string | null;
  overview?: string | null;
}

export class LandmarkImageDto {
  contentid: number;
  originimgurl: string;
  imgname: string;
  smallimageurl?: string | null;
  cpyrhtdivcd?: string | null;
  serialnum?: string | null;
}

export class LandmarkIntroDto {
  contentid: number;
  contenttypeid: number;
  heritage1?: boolean | null;
  heritage2?: boolean | null;
  heritage3?: boolean | null;
  infocenter?: string | null;
  opendate?: string | null;
  restdate?: string | null;
  expguide?: string | null;
  expagerange?: string | null;
  accomcount?: string | null;
  useseason?: string | null;
  usetime?: string | null;
  parking?: string | null;
  chkbabycarriage?: boolean | null;
  chkpet?: boolean | null;
  chkcreditcard?: boolean | null;
}

export class LandmarkDetailResponseDto {
  detail: LandmarkDetailDto;
  images: LandmarkImageDto[];
  intro?: LandmarkIntroDto | null;
  isStamped: boolean;
}
