export interface StampRow {
  landmark_id: number;
  created_at: string;
  landmark: {
    title: string;
    firstimage: string | null;
  } | null;
}
