class LandmarkSummaryDto {
  contentId: number;
  title: string;
  firstImage: string | null;
  addr1: string | null;
  cat1: string | null;
  cat2: string | null;
  cat3: string | null;
}

export class BookmarkResponseDto {
  id: number;
  userId: string;
  contentId: number;
  createdAt: string | null;
  landmark: LandmarkSummaryDto | null;
}
