import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CadetsService } from './cadets.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { User } from '../auth/decorators/user.decorator';
import { JoinCadetDto } from './dto/join-cadet-dto';
import { CadetApplyInfoDto } from './dto/cadet-apply-info.dto';
import { UpdateCadetDto } from './dto/update-cadet.dto';

@Controller()
export class CadetsController {
  constructor(private cadetsService: CadetsService) {}

  /*
   * 生徒のメンとリングページにメンターに伝えるURL（履歴書、質問内容）などDBに登録するAPI
   * メンターのメンとリングページにメンタリングカードからURLが見える
   * 既存コード：APIエンドポイント変更、サービズからレポジトリロジック分離
   */
  @Post('url')
  @Roles([ROLES.CADET])
  @UseGuards(AuthGuard, RoleGuard)
  async UpdateCadet(
    @User() user: JwtInfo,
    @Body() updateCadetDto: UpdateCadetDto,
  ): Promise<void> {
    await this.cadetsService.updateCadet(user.intraId, updateCadetDto);
  }

  /*
   * 生徒のメンとリングページにメンタリングカードのデータを返すAPI
   * 既存コード：不必要なクエリ改善、サービズからレポジトリロジック分離
   */
  @Get('mentorings')
  @Roles([ROLES.CADET])
  @UseGuards(AuthGuard, RoleGuard)
  async getMentoringLogs(@User() user: JwtInfo): Promise<CadetApplyInfoDto> {
    return await this.cadetsService.getMentoringLogs(user.intraId);
  }

  /*
   * 生徒の名前を登録するAPIの開発
   * このAPIによる、名前の入力した後、AuthServiceでisJoinをtrueでJwt, クッキーで発行する
   * 既存コード：サービズからレポジトリロジック分離
   */
  @Patch('join')
  @Roles([ROLES.CADET])
  @UseGuards(AuthGuard, RoleGuard)
  join(@Body() body: JoinCadetDto, @User() user: JwtInfo): Promise<boolean> {
    const name = body.name;

    if (name === '') {
      throw new BadRequestException(process.env.BADREQUESTEXCEPTION);
    }

    return this.cadetsService.saveName(user.intraId, body.name);
  }
}
