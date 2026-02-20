import { Database } from '../../database.types';

type StampEntity = Database['public']['Tables']['stamps']['Row'];
type LandmarkEntity = Database['public']['Tables']['landmark']['Row'];

export interface StampRow extends Pick<StampEntity, 'landmark_id' | 'created_at'> {
  landmark: Pick<LandmarkEntity, 'title' | 'firstimage'> | null;
}
