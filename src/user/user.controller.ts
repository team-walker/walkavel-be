import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { StampSummaryDto } from './dto/stamp-summary.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 내 스탬프 요약 정보 조회
   * 사용자가 지금까지 방문하여 획득한 스탬프의 총 개수와 각 랜드마크의 상세 정보를 반환합니다.
   */
  @Get('me/stamps/summary')
  async getMyStampSummary(@Req() req: RequestWithUser): Promise<StampSummaryDto> {
    return this.userService.getStampSummary(req.user.id);
  }
}
