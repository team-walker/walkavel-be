export interface StampRow {
  landmark_id: number;
  created_at: string;
  landmark_combined: {
    title: string;
    firstimage: string | null;
  } | null;
}
