import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ROLES } from '../auth/enum/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ReportsService } from './reports.service';

@Controller()
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  /*
   *  最初、私のメンタリングーMentorページで報告書作成というボタンを押す時にサーバーで基本報告書を生成するAPI
   *  既存コード：サービスのロジックをレポジトリとサービスで分離、ORMのCreateメソッドの代わりに、オブジェクトを生成する方法に変更
   */
  @Post(':mentoringLogId')
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async createReport(
    @Param('mentoringLogId') mentoringLogId: string,
  ): Promise<string> {
    return await this.reportsService.createReport(mentoringLogId);
  }
}
