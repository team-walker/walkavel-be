class UserResponseDto {
  /** User UUID.
   * @example "uuid-1234"
   */
  id: string;

  /** User email.
   * @example "user@example.com"
   */
  email?: string;

  /** Last sign-in timestamp (ISO-8601).
   * @example "2025-06-13T00:00:00Z"
   */
  last_sign_in_at?: string;
}

export class AuthMeResponseDto {
  /** Auth response message.
   * @example "���� ����"
   */
  message: string;

  /** Authenticated user profile. */
  user: UserResponseDto;
}
