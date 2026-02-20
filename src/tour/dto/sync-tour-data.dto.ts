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
}
