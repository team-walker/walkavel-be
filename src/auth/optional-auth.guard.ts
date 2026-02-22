import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';

import { AuthService } from './auth.service';
import type { RequestWithUser } from './interfaces/request-with-user.interface';

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  private readonly logger = new Logger(OptionalAuthGuard.name);

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
    } catch (error) {
      this.logger.debug(`Optional auth failed: ${(error as Error).message}`);
    }

    return true;
  }
}
