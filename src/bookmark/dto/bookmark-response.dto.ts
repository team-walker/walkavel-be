import { ApiProperty } from '@nestjs/swagger';

class LandmarkSummaryDto {
  @ApiProperty({ example: 126508 })
  contentid: number;

  @ApiProperty({ example: '경복궁' })
  title: string;

  @ApiProperty({ example: 'http://...', nullable: true })
  firstimage: string | null;

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

  @ApiProperty({ example: 126508 })
  content_id: number;

  @ApiProperty({ example: '2026-02-07T14:30:00Z' })
  created_at: string;

  @ApiProperty({ type: LandmarkSummaryDto, nullable: true })
  landmark: LandmarkSummaryDto | null;
}
