import { ApiProperty } from '@nestjs/swagger';

export class SyncTourResponseDto {
  @ApiProperty({ description: 'Operation success status' })
  success: boolean;

  @ApiProperty({ description: 'Response message' })
  message: string;
}

export class SyncTourDetailResponseDto extends SyncTourResponseDto {
  @ApiProperty({ description: 'Number of updated items' })
  updatedCount: number;

  @ApiProperty({ description: 'List of updated content IDs', type: [Number] })
  updatedIds: number[];
}
