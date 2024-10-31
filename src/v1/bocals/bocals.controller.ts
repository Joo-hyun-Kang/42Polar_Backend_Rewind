import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { ReportQueryRowDto } from './dto/report-query-row.dto';
import { PaginationReportDto } from './dto/pagination-report.dto';
import { DataroomService } from './dataroom.service';
import { ReportIdDto } from './dto/patch-report-status.dto';

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

  /*
   *  Bocal(運営)のデータルームで選んだ報告書の状態を修正期間に変えるAPI
   *  既存コード
   *  既存コートがN回クエリを出すことをUpdateクエリを利用して最適化
   */
  @Patch('data-room/reports/edit')
  @Roles([ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async patchReportStatusToEdit(@Body() reportIdDto: ReportIdDto) {
    //文字列配列が空の場合はclass-validatorが動作していないので
    if (reportIdDto.id.length <= 0) {
      throw new BadRequestException('選択した報告書がありません。');
    }

    return this.dataroomService.patchReportStatusToEdit(reportIdDto.id);
  }

  /*
   *  Bocal(運営)のデータルームで選んだ報告書の状態を作成完了に変えるAPI
   *  既存コード
   *  既存コートがN回クエリを出すことをUpdateクエリを利用して最適化
   */
  @Patch('data-room/reports/done')
  @Roles([ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async patchReportStatusToDone(@Body() reportIdDto: ReportIdDto) {
    //文字列配列が空の場合はclass-validatorが動作していないので
    if (reportIdDto.id.length <= 0) {
      throw new BadRequestException('選択した報告書がありません。');
    }

    return this.dataroomService.patchReportStatusToDone(reportIdDto.id);
  }

  /*
   *  Bocal(運営)のデータルームで全ての作成完了の報告書の状態を修正期間に変えるAPI
   *  既存コード
   *  既存コートがN回クエリを出すことをUpdateクエリを利用して最適化
   */
  @Patch('data-room/reports/all/edit')
  @Roles([ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async patchAllReportStatusToEdit() {
    return this.dataroomService.updateAllReportStatusToEdit();
  }

  /*
   *  Bocal(運営)のデータルームで全ての修正期間の報告書の状態を作成完了に変えるAPI
   *  既存コード
   *  既存コートがN回クエリを出すことをUpdateクエリを利用して最適化
   */
  @Patch('data-room/reports/all/done')
  @Roles([ROLES.BOCAL])
  @UseGuards(AuthGuard, RoleGuard)
  async patchAllReportStatusToDone() {
    return this.dataroomService.updateAllReportStatusToDone();
  }
}
