import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtInfo } from '../interface/jwt-user.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtInfo => {
    const request = ctx.switchToHttp().getRequest();

    return {
      //もしかして、request['user']がない場合、null例外が発生すれば、  @UseGuards(AuthGuard, RoleGuard)がコントローラーに貼り付けているか確認。
      //null例外が発生することは、正しくログインなどができていない証拠なので、？で誤魔化すことは遠慮したほうがいいです
      id: request['user'].sub,
      intraId: request['user'].username,
      role: request['user'].role,
    };
  },
);
