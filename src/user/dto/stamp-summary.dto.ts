import { ApiProperty } from '@nestjs/swagger';

export class StampSummaryDto {
  @ApiProperty({ description: '유저가 획득한 총 스탬프 개수', example: 5 })
  totalCount: number;

  @ApiProperty({
    description: '획득한 랜드마크 리스트',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        landmark_id: { type: 'number', description: '랜드마크 고유 ID (contentid)' },
        title: { type: 'string', description: '랜드마크 이름' },
        image: { type: 'string', description: '랜드마크 대표 이미지 URL', nullable: true },
        obtained_at: { type: 'string', format: 'date-time', description: '스탬프 획득 일시' },
      },
    },
  })
  landmarks: {
    landmark_id: number;
    title: string;
    image: string | null;
    obtained_at: string;
  }[];
}
