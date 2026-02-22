import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateStampDto {
  /**
   * 랜드마크 ID
   * @example 126508
   */
  @IsInt()
  @IsNotEmpty()
  @Min(1)
  landmarkId: number;
}
