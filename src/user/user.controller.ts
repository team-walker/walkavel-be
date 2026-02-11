import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @Get('me/stamps/summary')
  @ApiOperation({ summary: '내 스탬프 요약' })
  @ApiResponse({ status: 200, type: StampSummaryDto })
  async getMyStampSummary(@Req() req: RequestWithUser): Promise<StampSummaryDto> {
    return this.userService.getStampSummary(req.user.id);
  }
}
