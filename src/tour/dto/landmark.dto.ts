import { Database } from '../../database.types';

type LandmarkRow = Database['public']['Tables']['landmark']['Row'];

export class LandmarkDto implements Partial<LandmarkRow> {
  /**
   * 콘텐츠 ID
   * @example 126508
   */
  contentid: number;

  /**
   * 콘텐츠 타입 ID
   * @example 12
   */
  contenttypeid?: number | null;

  /**
   * 제목
   * @example "가야산"
   */
  title: string;

  /**
   * 주소1
   * @example "경상남도 합천군"
   */
  addr1?: string | null;

  /**
   * 주소2
   */
  addr2?: string | null;

  /**
   * 우편번호
   * @example "50200"
   */
  zipcode?: string | null;

  /**
   * 전화번호
   * @example "055-930-8000"
   */
  tel?: string | null;

  /**
   * 지역 코드
   * @example 36
   */
  areacode?: number | null;

  /**
   * 시군구 코드
   * @example 18
   */
  sigungucode?: number | null;

  /**
   * 대분류
   * @example "A01"
   */
  cat1?: string | null;

  /**
   * 중분류
   * @example "A0101"
   */
  cat2?: string | null;

  /**
   * 소분류
   * @example "A01010100"
   */
  cat3?: string | null;

  /**
   * GPS X좌표 (경도)
   * @example 128.123456
   */
  mapx?: number | null;

  /**
   * GPS Y좌표 (위도)
   * @example 35.123456
   */
  mapy?: number | null;

  /**
   * 지도 레벨
   * @example 6
   */
  mlevel?: number | null;

  /**
   * 대표 이미지 (원본)
   */
  firstimage?: string | null;

  /**
   * 대표 이미지 (썸네일)
   */
  firstimage2?: string | null;

  /**
   * 저작권 유형
   */
  cpyrhtdivcd?: string | null;

  /**
   * 등록일
   * @example "20231010120000"
   */
  createdtime?: string | null;

  /**
   * 수정일
   * @example "20231011120000"
   */
  modifiedtime?: string | null;

  /**
   * 법정동 코드
   */
  ldongregncd?: number | null;

  /**
   * 법정동 시군구 코드
   */
  ldongsigngucd?: number | null;

  /**
   * 지방자치단체 분류 1
   */
  lclssystm1?: string | null;

  /**
   * 지방자치단체 분류 2
   */
  lclssystm2?: string | null;

  /**
   * 지방자치단체 분류 3
   */
  lclssystm3?: string | null;
}
