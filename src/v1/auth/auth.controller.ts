import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInfo42OriginDto } from './dto/oauth-42user-info-orgin.dto';
import { JwtInfoAndJoin } from './interface/jwt-user.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse } from './dto/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Get('/oauth/callback')
  async signIn42Intra(@Query('code') authCode: string): Promise<AuthResponse> {
    //ユーザの情報を42APIからもらう
    const userProfile: UserInfo42OriginDto =
      await this.authService.getProfileBy42Intra(authCode);

    //ユーザの情報バーリデーションと最初ローグインの場合DBに登録する
    const jwtandJoin: JwtInfoAndJoin =
      await this.authService.createAndUpdateProfile(userProfile);

    //JWT生成
    const jwt = await this.jwtService.sign({
      sub: jwtandJoin.jwtinfo.id,
      username: jwtandJoin.jwtinfo.intraId,
      role: jwtandJoin.jwtinfo.role,
    });

    return {
      jwt,
      user: {
        intraId: jwtandJoin.jwtinfo.intraId,
        role: jwtandJoin.jwtinfo.role,
        join: jwtandJoin.isJoined,
      },
    };
  }
}
