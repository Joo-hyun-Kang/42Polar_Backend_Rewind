import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface ClientRequest {
  request: Request;
  accessToken: string;
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

    let accessToken: string = null;

    if (request.headers.cookie) {
      accessToken = this.parseCookies(request.headers.cookie);
    } else if (request.headers.authorization) {
      accessToken = this.extractToken(request.headers.authorization);
    }

    const ClientRequest = {
      request: request,
      accessToken: accessToken,
    };

    return await this.authenticateToken(ClientRequest);
  }

  private parseCookies(cookie: string): string {
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

    return cookieObject['access_token'];
  }

  private extractToken(authorization: string): string | undefined {
    const [type, token] = authorization?.split(' ') ?? [];
    return type === 'bearer' || 'Bearer' ? token : undefined;
  }

  private async authenticateToken(
    clientRequest: ClientRequest,
  ): Promise<boolean> {
    if (!clientRequest.accessToken) {
      throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        clientRequest.accessToken,
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
