import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      //RoleGuardがかかっているのに、許可するRoleをつけていない場合
      throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
    }
    const request = context.switchToHttp().getRequest();
    const user = request['user'];

    if (!user) {
      //authGuardでjwtトークン認証に通ってない
      throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    return this.matchRoles(roles, user.role);
  }

  matchRoles(roles: string[], userRole: string) {
    if (!roles.includes(userRole)) {
      throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    return true;
  }
}
