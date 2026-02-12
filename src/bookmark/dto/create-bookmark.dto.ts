import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  contentId!: number;
}
