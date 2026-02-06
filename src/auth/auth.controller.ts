import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './auth.guard';
import { AuthMeResponseDto } from './dto/auth-me-response.dto'; // DTO 임포트
import type { RequestWithUser } from './interfaces/request-with-user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '내 정보 조회',
    description: '토큰을 통해 인증된 유저의 정보를 가져옵니다.',
  })
  // 1. 반환 타입을 우리가 만든 DTO로 명시 (Swagger용)
  @ApiResponse({ status: 200, description: '성공', type: AuthMeResponseDto })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @Get('me')
  getMe(@Req() req: RequestWithUser): AuthMeResponseDto {
    // 2. 반환 타입 명시
    return {
      message: '인증 성공',
      user: {
        id: req.user.id,
        email: req.user.email,
        last_sign_in_at: req.user.last_sign_in_at,
        // 3. req.user 전체를 넘기지 않고, DTO 정의에 맞게 필요한 데이터만 골라서 보냄
      },
    };
  }
}
