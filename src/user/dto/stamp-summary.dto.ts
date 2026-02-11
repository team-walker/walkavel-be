import { ApiProperty } from '@nestjs/swagger';

export class LandmarkDetail {
  @ApiProperty({ description: '랜드마크 ID' })
  landmarkId: number;

  @ApiProperty({ description: '랜드마크 명칭' })
  title: string;

  @ApiProperty({ description: '이미지 URL', nullable: true })
  image: string | null;

  @ApiProperty({ description: '획득 일시' })
  obtainedAt: string;
}

export class StampSummaryDto {
  @ApiProperty({ description: '총 스탬프 개수' })
  totalCount: number;

  @ApiProperty({ type: [LandmarkDetail], description: '획득한 랜드마크 목록' })
  landmarks: LandmarkDetail[];
}
