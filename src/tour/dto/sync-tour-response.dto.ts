export class SyncTourResponseDto {
  /**
   * 성공 여부
   * @example true
   */
  success: boolean;

  /**
   * 결과 메시지
   * @example "Tour sync completed"
   */
  message: string;
}

export class SyncTourDetailResponseDto extends SyncTourResponseDto {
  /**
   * 업데이트된 항목 수
   * @example 42
   */
  updatedCount: number;

  /**
   * 업데이트된 ID 목록
   * @example [126508, 126509]
   */
  updatedIds: number[];
}
