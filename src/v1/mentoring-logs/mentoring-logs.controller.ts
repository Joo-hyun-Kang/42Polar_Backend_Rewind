import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MentoringLogsService } from './mentoring-logs.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { User } from '../auth/decorators/user.decorator';
import { CreateApplyDto } from './dto/create-apply.dto';

@Controller()
export class MentoringLogsController {
  constructor(private mentoringLogsService: MentoringLogsService) {}

  /*
   * メンタリング申し込みページで、新しいメンタリングを申し込みとデーターを生成するAPI
   * 既存コード改善
   * -過去時間い申し込み防ぐロジック追加
   * -Date型で切り替えていない場合、変更する、Date型にあってない場合は例外が発生する
   * -APIをエンドポイントの変更、サービスでレポコードを分離
   */
  @Post('apply/:mentorId')
  @Roles([ROLES.CADET])
  @UseGuards(AuthGuard, RoleGuard)
  async apply(
    @Param('mentorId') mentorId: string,
    @User() user: JwtInfo,
    @Body() createApplyDto: CreateApplyDto,
  ): Promise<boolean> {
    return await this.mentoringLogsService.createMentorigLog(
      mentorId,
      user.intraId,
      createApplyDto,
    );
  }
}
