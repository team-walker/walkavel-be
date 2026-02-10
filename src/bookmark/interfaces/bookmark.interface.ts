export interface LandmarkSummary {
  contentId: number;
  title: string;
  firstImage: string | null;
  addr1: string | null;
  cat1: string | null;
  cat2: string | null;
  cat3: string | null;
}

export interface BookmarkWithLandmark {
  id: number;
  userId: string;
  contentId: number;
  createdAt: string | null;
  landmark: LandmarkSummary | null;
}
