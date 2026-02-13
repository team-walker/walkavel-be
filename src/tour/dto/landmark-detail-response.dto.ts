import { Database } from '../../database.types';
import { LandmarkDto } from './landmark.dto';

type LandmarkDetailRow = Database['public']['Tables']['landmark_detail']['Row'];
type LandmarkImageRow = Database['public']['Tables']['landmark_image']['Row'];
type LandmarkIntroRow = Database['public']['Tables']['landmark_intro']['Row'];

export class LandmarkDetailDto extends LandmarkDto implements Partial<LandmarkDetailRow> {
  /**
   * 홈페이지 URL
   */
  homepage?: string | null;

  /**
   * 개요 (HTML 포함 가능)
   */
  overview?: string | null;
}

export class LandmarkImageDto implements Partial<LandmarkImageRow> {
  /**
   * 이미지 ID
   * @example 1
   */
  id: number;

  /**
   * 콘텐츠 ID
   */
  contentid: number;

  /**
   * 원본 이미지 URL
   */
  originimgurl: string;

  /**
   * 이미지 제목
   */
  imgname: string;

  /**
   * 썸네일 이미지 URL
   */
  smallimageurl?: string | null;

  /**
   * 저작권 유형
   */
  cpyrhtdivcd?: string | null;

  /**
   * 일련번호
   */
  serialnum?: string | null;
}

export class LandmarkIntroDto implements Partial<LandmarkIntroRow> {
  /**
   * 콘텐츠 ID
   */
  contentid: number;

  /**
   * 콘텐츠 타입 ID
   */
  contenttypeid: number;

  /**
   * 세계문화유산 유무
   */
  heritage1?: boolean | null;

  /**
   * 세계자연유산 유무
   */
  heritage2?: boolean | null;

  /**
   * 세계기록유산 유무
   */
  heritage3?: boolean | null;

  /**
   * 문의 및 안내
   */
  infocenter?: string | null;

  /**
   * 개장일
   */
  opendate?: string | null;

  /**
   * 쉬는날
   */
  restdate?: string | null;

  /**
   * 체험프로그램
   */
  expguide?: string | null;

  /**
   * 체험가능연령
   */
  expagerange?: string | null;

  /**
   * 수용인원
   */
  accomcount?: string | null;

  /**
   * 이용시기
   */
  useseason?: string | null;

  /**
   * 이용시간
   */
  usetime?: string | null;

  /**
   * 주차시설
   */
  parking?: string | null;

  /**
   * 유모차 대여 여부
   */
  chkbabycarriage?: boolean | null;

  /**
   * 애완동물 동반 가능 여부
   */
  chkpet?: boolean | null;

  /**
   * 신용카드 정보
   */
  chkcreditcard?: boolean | null;
}

export class LandmarkDetailResponseDto {
  /**
   * 랜드마크 상세 정보
   */
  detail: LandmarkDetailDto;

  /**
   * 랜드마크 이미지 목록
   */
  images: LandmarkImageDto[];

  /**
   * 랜드마크 소개 정보
   */
  intro?: LandmarkIntroDto | null;

  /**
   * 스탬프 획득 여부
   * @example false
   */
  isStamped: boolean;
}
