import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import type { RequestWithUser } from './interfaces/request-with-user.interface';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return true;
    }

    try {
      const [type, token] = authHeader.split(' ');
      if (type === 'Bearer' && token) {
        request.user = await this.authService.verifyToken(token);
      }
    } catch {
      // Optional auth: ignore malformed/expired token and continue as guest.
    }
    return true;
  }
}
