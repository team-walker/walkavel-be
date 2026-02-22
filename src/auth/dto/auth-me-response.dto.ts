class UserResponseDto {
  /**
   * 사용자 UUID
   * @example 'uuid-1234'
   */
  id: string;

  /**
   * 사용자 이메일
   * @example 'user@example.com'
   */
  email?: string;

  /**
   * 마지막 로그인 시각
   * @example '2025-06-13T00:00:00Z'
   */
  last_sign_in_at?: string;
}

export class AuthMeResponseDto {
  /** @example '인증 성공' */
  message: string;

  /** Supabase 유저 정보 */
  user: UserResponseDto;
}
