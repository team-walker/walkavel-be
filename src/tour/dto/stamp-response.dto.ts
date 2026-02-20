import { Database } from '../../database.types';

type StampRow = Database['public']['Tables']['stamps']['Row'];

export class StampResponseDto implements StampRow {
  /**
   * 스탬프 ID
   * @example 1
   */
  id: number;

  /**
   * 사용자 화면 ID (UUID)
   * @example "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
   */
  user_id: string;

  /**
   * 랜드마크 ID
   * @example 126508
   */
  landmark_id: number;

  /**
   * 생성일
   * @example "2026-02-13T12:00:00.000Z"
   */
  created_at: string;
}
