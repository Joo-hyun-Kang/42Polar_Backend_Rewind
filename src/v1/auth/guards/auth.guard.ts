import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface ClientRequest {
  request: Request;
  clinetCookies: ClientCookieDto;
}

interface ClientCookieDto {
  access_token: string;
  intra_id: string;
  user_role: string;
  info_join: boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const ClientRequest = {
      request: request,
      clinetCookies: this.parseCookies(request.headers.cookie),
    };

    return await this.authenticateToken(ClientRequest);
  }

  private parseCookies(cookie: string): ClientCookieDto {
    if (!cookie) {
      throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
    }
    const cookieArray = cookie.split('; ');
    const cookieObject = {};
    cookieArray.forEach((cookie) => {
      const [key, value] = cookie.split('=');
      cookieObject[key] = value;
    });

    // info_joinをbooleanに変換
    const infoJoinValue = cookieObject['info_join'] === 'true';

    return {
      access_token: cookieObject['access_token'],
      intra_id: cookieObject['intra_id'],
      user_role: cookieObject['user_role'],
      info_join: infoJoinValue,
    };
  }

  private async authenticateToken(
    clientRequest: ClientRequest,
  ): Promise<boolean> {
    if (!clientRequest.clinetCookies.access_token) {
      throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        clientRequest.clinetCookies.access_token,
        {
          secret: process.env.JWT_SECRET,
        },
      );
      clientRequest.request['user'] = payload;
    } catch {
      throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    return true;
  }
}
