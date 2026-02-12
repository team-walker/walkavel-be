import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBookmarkDto {
  /** Landmark content ID to bookmark.
   * @example 126508
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  contentId!: number;
}
