export class SyncTourResponseDto {
  /** Sync success status.
   * @example true
   */
  success: boolean;

  /** Sync result message.
   * @example "Tour sync completed"
   */
  message: string;
}

export class SyncTourDetailResponseDto extends SyncTourResponseDto {
  /** Number of updated rows.
   * @example 42
   */
  updatedCount: number;

  /** Updated content IDs.
   * @example [126508, 126509]
   */
  updatedIds: number[];
}
