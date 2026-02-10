import { ApiProperty } from '@nestjs/swagger';

class LandmarkSummaryDto {
  @ApiProperty({ example: 126508 })
  contentId: number;

  @ApiProperty({ example: '경복궁' })
  title: string;

  @ApiProperty({ example: 'http://...', nullable: true })
  firstImage: string | null;

  @ApiProperty({ example: '서울특별시 종로구...', nullable: true })
  addr1: string | null;

  @ApiProperty({ example: 'A02', nullable: true })
  cat1: string | null;

  @ApiProperty({ example: 'A0201', nullable: true })
  cat2: string | null;

  @ApiProperty({ example: 'A02010100', nullable: true })
  cat3: string | null;
}

export class BookmarkResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'uuid-1234' })
  userId: string;

  @ApiProperty({ example: 126508 })
  contentId: number;

  @ApiProperty({ example: '2026-02-07T14:30:00Z', nullable: true })
  createdAt: string | null;

  @ApiProperty({ type: LandmarkSummaryDto, nullable: true })
  landmark: LandmarkSummaryDto | null;
}
