class UserResponseDto {
  id: string;
  email?: string;
  last_sign_in_at?: string;
}

export class AuthMeResponseDto {
  message: string;
  user: UserResponseDto;
}
