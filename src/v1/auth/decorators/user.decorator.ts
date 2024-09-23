import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtInfo } from '../interface/jwt-user.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtInfo => {
    const request = ctx.switchToHttp().getRequest();

    return {
      id: request['user'].sub,
      intraId: request['user'].username,
      role: request['user'].role,
    };
  },
);
