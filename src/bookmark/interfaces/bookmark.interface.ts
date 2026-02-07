export interface LandmarkSummary {
  contentid: number;
  title: string;
  firstimage: string | null;
  addr1: string | null;
  cat1: string | null;
  cat2: string | null;
  cat3: string | null;
}

export interface BookmarkWithLandmark {
  id: number;
  content_id: number;
  created_at: string;
  landmark: LandmarkSummary;
}
