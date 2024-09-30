import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ROLES } from '../auth/enum/roles.enum';
import { Roles } from '../auth/decorators/roles.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller()
export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  /*
   *  メンタリング申し込みページで、既にお待ち中、確定のメンタリング時刻を返すAPI
   *  お知らせ
   *　完了されたメンタリングは？ -> 🙂‍↔、完了になったことは申請する時の過去なので
   *　今日以前の日に申し込む場合は　→ cadetsControllerでメンタリングを生成するロジックで防止
   *  エラー処理
   *　メンターがない場合、mentorsモージュルから例外
   *　プロントはステイタスコードが200でなければ、エラーウィンドウを発生する
   *　既存コード：サービスでレポコードを分離
   */
  @Get('/request-times/:mentorIntraId')
  @Roles([ROLES.CADET, ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async getRequestTimes(
    @Param('mentorIntraId') mentorIntraId: string,
    @Query('date') date: string,
  ): Promise<Date[][]> {
    const reservedTimes = await this.calendarService.getReservedTimes(
      mentorIntraId,
    );
    return await this.calendarService.filterDate(reservedTimes, date);
  }

  /*
   *  メンタリング申し込みページで、メンターのメンタリング可能時間を返すAPI
   *　メンターがない場合、mentorsモージュルから例外
   *　プロントはステイタスコードが200でなければ、エラーウィンドウを発生する
   *　既存コード：サービスでレポコードを分離
   */
  @Get('/available-times/:mentorIntraId')
  @Roles([ROLES.CADET, ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  async getAvailableTimes(
    @Param('mentorIntraId') mentorIntraId: string,
  ): Promise<Date[][]> {
    return await this.calendarService.getAvailableTimes(mentorIntraId);
  }
}
