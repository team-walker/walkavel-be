import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
// 💡 아래 줄을 'import type'으로 변경합니다.
import type { RequestWithUser } from '../auth/interfaces/request-with-user.interface';
import { StampSummaryDto } from './dto/stamp-summary.dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me/stamps/summary')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '내 스탬프 요약' })
  @ApiResponse({ status: 200, type: StampSummaryDto })
  async getMyStampSummary(@Req() req: RequestWithUser): Promise<StampSummaryDto> {
    return await this.userService.getStampSummary(req.user.id);
  }
}
