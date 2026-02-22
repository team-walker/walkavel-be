import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBookmarkDto {
  /**
   * 랜드마크 콘텐츠 ID
   * @example 126508
   */
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  contentId!: number;
}
