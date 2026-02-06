import { ApiProperty } from '@nestjs/swagger';

// 1. 필요한 필드만 담은 클래스 정의
class UserResponseDto {
  @ApiProperty({ example: 'uuid-1234', description: '사용자 UUID' })
  id: string;

  @ApiProperty({ example: 'user@example.com', description: '사용자 이메일' })
  email?: string;

  @ApiProperty({ example: '2025-06-13T...', description: '마지막 로그인 시각' })
  last_sign_in_at?: string;
}

export class AuthMeResponseDto {
  @ApiProperty({ example: '인증 성공' })
  message: string;

  @ApiProperty({
    type: UserResponseDto, // 2. any 대신 정의한 클래스 사용
    description: 'Supabase 유저 정보',
  })
  user: UserResponseDto;
}
