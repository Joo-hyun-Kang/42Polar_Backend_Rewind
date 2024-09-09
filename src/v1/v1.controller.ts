import { Controller, Get } from '@nestjs/common';

@Controller()
export class V1Controller {
  @Get('login')
  login(): string {
    return `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.UID_42}&redirect_uri=${process.env.REDIRECT_42}&response_type=code`;
  }
}
