import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInfo42OriginDto } from './dto/oauth-42user-info-orgin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('oauth/42')
  async signIn42Intra(@Query('code') authCode: string): Promise<string> {
    //ユーザの情報を42APIからもらう
    const userProfile: UserInfo42OriginDto =
      await this.authService.getProfileBy42Intra(authCode);

    //ユーザの情報バーリデーションと最初ローグインの場合DBに登録する
    this.authService.createAndUpdateProfile(userProfile);

    //   //createJWT

    return 'Hello world';
  }
}
