import { ApiProperty } from '@nestjs/swagger';

export class BookmarkStatusResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indicates if the content is bookmarked by the user.',
  })
  isBookmarked: boolean;
}
