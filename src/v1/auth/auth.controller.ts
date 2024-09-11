import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInfo42OriginDto } from './dto/oauth-42user-info-orgin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('oauth/42')
  async signIn42Intra(@Query('code') authCode: string): Promise<string> {
    //getProfile
    const userProfile: UserInfo42OriginDto =
      await this.authService.getProfileBy42Intra(authCode);

    //validateProfile
    //   const role = this.authService.validateProfile(userProfile);

    //   //saveProfile
    //   this.authService.saveProfile();

    //   //createJWT

    return 'Hello world';
  }
}
