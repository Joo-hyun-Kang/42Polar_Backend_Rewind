import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ROLES } from '../auth/enum/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ReportsService } from './reports.service';
import { ReportDto } from './dto/report.dto';

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

  /*
   *  最初、報告書ページで作成できたデータを送るAPI
   *  既存コード：サービスのロジックをレポジトリとサービスで分離
   */
  @Get(':reportId')
  @Roles([ROLES.MENTOR, ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async getReport(@Param('reportId') reportId: string): Promise<ReportDto> {
    return await this.reportsService.getReport(reportId);
  }
}
