class LandmarkSummaryDto {
  /** Landmark content ID.
   * @example 126508
   */
  contentId: number;
  /** Landmark title.
   * @example "Gyeongbokgung Palace"
   */
  title: string;
  /** Representative image URL.
   * @example "https://example.com/image.jpg"
   */
  firstImage: string | null;
  /** Primary address.
   * @example "161 Sajik-ro, Jongno-gu, Seoul"
   */
  addr1: string | null;
  /** Category code level 1.
   * @example "A02"
   */
  cat1: string | null;
  /** Category code level 2.
   * @example "A0201"
   */
  cat2: string | null;
  /** Category code level 3.
   * @example "A02010100"
   */
  cat3: string | null;
}

export class BookmarkResponseDto {
  /** Bookmark ID.
   * @example 1
   */
  id: number;
  /** User UUID.
   * @example "uuid-1234"
   */
  userId: string;
  /** Landmark content ID.
   * @example 126508
   */
  contentId: number;
  /** Created timestamp (ISO-8601).
   * @example "2026-02-07T14:30:00Z"
   */
  createdAt: string | null;
  /** Landmark summary payload. */
  landmark: LandmarkSummaryDto | null;
}
