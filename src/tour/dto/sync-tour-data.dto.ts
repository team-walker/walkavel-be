export class SyncTourDataResponseDto {
  /**
   * 성공 여부
   * @example true
   */
  success: boolean;

  /**
   * 처리된 레코드 수
   * @example 120
   */
  count?: number;

  /**
   * 결과 메시지
   * @example "Tour data synced successfully"
   */
  message?: string;

  /** 업데이트된 콘텐츠 ID 목록
   * @example [126508, 126509]
   */
  updatedIds?: number[];
}
