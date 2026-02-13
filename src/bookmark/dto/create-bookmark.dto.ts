import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBookmarkDto {
  /**
   * The content ID of the landmark.
   * @example 126508
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  contentId!: number;
}
