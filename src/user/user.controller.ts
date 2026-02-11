import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';

import { StampSummaryDto } from './dto/stamp-summary.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id/stamps/summary')
  async getStampSummary(@Param('id', new ParseUUIDPipe()) id: string): Promise<StampSummaryDto> {
    return await this.userService.getStampSummary(id);
  }
}
