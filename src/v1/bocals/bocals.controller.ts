import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ReportQueryRowDto } from './dto/report-query-row.dto';
import { PaginationReportDto } from './dto/pagination-report.dto';
import { DataroomService } from './dataroom.service';

@Controller()
export class BocalsController {
  constructor(private dataroomService: DataroomService) {}

  /*
   *  Bocal(運営)のデータルームで作成完了、修正期間である報告書を見せるAPI（フィールター機能あり）
   *  Seedingのデータの生成ロジック修正
   *  既存コード
   *  Date, Boolean, Enumについて、class-validatorが作動しないところ、解決
   *  DTO名前を明確に変更、DBに遅延ローディン適用、期間検索ロジックのバグ（桁数が２桁以上処理バグ）解決
   */
  @Get('data-room')
  @Roles([ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async getReportPagination(
    @Query() reportQueryRowDto: ReportQueryRowDto,
  ): Promise<PaginationReportDto> {
    // class-validatorの@Type(() => )中に作動していないので、 直接に実装
    // クエリの中に、正しくないデータ型があれば、例外が発生する
    const parsedReportQueryDto =
      this.dataroomService.parseReportQueryRowDto(reportQueryRowDto);

    return await this.dataroomService.getReportPagination(parsedReportQueryDto);
  }
}
