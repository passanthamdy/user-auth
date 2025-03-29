import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ERROR_MESSAGES } from 'src/config/errors.config';
import { AuthRequest } from './interfaces/auth-request';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(ERROR_MESSAGES.token.INVALID);
    }
    //verify the token
    const payload = this.authService.verifyJwtToken(token, 'access');
    request.authUserId = payload.id;
    return true
  }

  private getTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }
}