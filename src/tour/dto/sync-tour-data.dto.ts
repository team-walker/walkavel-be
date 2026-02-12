export class SyncTourDataResponseDto {
  /** Sync success status.
   * @example true
   */
  success: boolean;

  /** Number of processed records.
   * @example 120
   */
  count?: number;

  /** Sync result message.
   * @example "Tour data synced successfully"
   */
  message?: string;
}
