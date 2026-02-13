import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { StampSummaryDto } from './dto/stamp-summary.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 내 스탬프 요약
   */
  @Get('me/stamps/summary')
  async getMyStampSummary(@Req() req: RequestWithUser): Promise<StampSummaryDto> {
    return this.userService.getStampSummary(req.user.id);
  }
}
