import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLE_KEY } from 'src/shared/decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const userRole = request.user?.role;

    if (!roles || roles.length === 0 || !userRole) {
      return true; // If no roles are defined, allow access
    }

    // Check if the user's role is included in the allowed roles
    const hasRole = roles.includes(String(userRole));
    if (!hasRole) {
      throw new UnauthorizedException(
        `User role '${userRole}' is not allowed to access this resource.`,
      );
    }
    return true; // Allow access if the user's role is allowed
  }
}
