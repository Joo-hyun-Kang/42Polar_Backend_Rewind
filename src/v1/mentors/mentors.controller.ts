import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MentorDto } from './dto/mentor.dto';
import { MentorsService } from './mentors.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { User } from '../auth/decorators/user.decorator';
import { UpdateMentorDatailDto } from './dto/mentor-detail.dto';

@Controller()
export class MentorsController {
  constructor(private mentorService: MentorsService) {}

  /*
   * フロントのメンター詳細ページでメンター情報を見せる時に使う
   * 既存コード：サービスでレポコードを分離、フロントコードでデフォルトイメージで見えるようにコード修正
   */
  @Get(':intraId')
  async getMentorDetails(
    @Param('intraId') intraId: string,
  ): Promise<MentorDto> {
    return await this.mentorService.getMentorDetails(intraId);
  }

  /*
   * フロントのメンター詳細ページでメンター情報をアップデートするAPI
   * 既存コード：サービスでレポコードを分離
   */
  @Patch(':intraId')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async updateMentorDetails(
    @User() user: JwtInfo,
    @Param('intraId') intraId: string,
    @Body() body: UpdateMentorDatailDto,
  ): Promise<boolean> {
    if (user.intraId !== intraId) {
      throw new BadRequestException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    return await this.mentorService.updateMentorDetails(user.intraId, body);
  }
}
