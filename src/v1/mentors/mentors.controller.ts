import { Controller, Get, Param } from '@nestjs/common';

@Controller()
export class MentorsController {
  @Get(':intraId')
  async getMentorDetails(@Param('intraId') intraId: string): Promise<any> {
    return intraId;
  }
}
