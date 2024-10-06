import {
  Injectable,
  ConflictException,
  BadRequestException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { getJSTDate } from '../util/utils';
import { CreateApplyDto } from './dto/create-apply.dto';
import { CalendarService } from '../calendar/calendar.service';

@Injectable()
export class ApplyService {
  constructor(
    @Inject(forwardRef(() => CalendarService))
    private readonly calendarService: CalendarService,
  ) {}

  checkDate(startDate: Date, endDate: Date): void {
    if (
      startDate.getUTCFullYear() !== endDate.getUTCFullYear() ||
      startDate.getUTCMonth() !== endDate.getUTCMonth() ||
      startDate.getUTCDate() !== endDate.getUTCDate()
    ) {
      throw new BadRequestException('メンタリングは当日の終了です。');
    }
    if (endDate.getTime() - startDate.getTime() > 1000 * 60 * 60 * 3) {
      throw new BadRequestException(
        'メンターリングは最大３時間まで申し込みできます',
      );
    }
  }

  checkUnitTime(startDate: Date, endDate: Date): void {
    if (startDate > endDate) {
      throw new BadRequestException(
        '始まり時間が終わり時間より遅くなっています。',
      );
    }

    const startHour: number = startDate.getUTCHours();
    const startMinute: number = startDate.getUTCMinutes();
    const endHour: number = endDate.getUTCHours();
    const endMinute: number = endDate.getUTCMinutes();

    if (
      (startMinute !== 0 && startMinute !== 30) ||
      (endMinute !== 0 && endMinute !== 30)
    ) {
      throw new BadRequestException('メンタリングは００分、３０分に承ります。');
    }

    if (endHour === 0 && endMinute === 0) {
      if (startHour === 23 && startMinute === 30) {
        throw new BadRequestException(
          'メンタリングは最低1時間以上の時間をいただきます',
        );
      }
    } else {
      const endTotalMinute = endHour * 60 + endMinute;
      const startTotalMinute = startHour * 60 + startMinute;
      if (endTotalMinute - startTotalMinute < 60) {
        throw new BadRequestException(
          'メンタリングは最低1時間以上の時間をいただきます',
        );
      }
    }
  }

  checJSTartToEnd(startDate: Date, endDate: Date): void {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    if (startTime >= endTime) {
      throw new BadRequestException(
        '始まり時間が終わり時間より遅くなっています。',
      );
    }
  }

  checkTime(startDate: Date, endDate: Date): void {
    this.checkDate(startDate, endDate);
    this.checkUnitTime(startDate, endDate);
    this.checJSTartToEnd(startDate, endDate);
  }

  checkSameTime(time1: Date[], time2: Date[]) {
    const time1Start = time1[0].getTime();
    const time1End = time1[1].getTime();
    const time2Start = time2[0].getTime();
    const time2End = time2[1].getTime();
    if (time1Start === time2Start && time1End === time2End) {
      throw new BadRequestException('ご指定の候補時間が重なっています');
    }
  }

  checkAvailableTime(requestTimesJST: Date[][]): void {
    this.checkTime(requestTimesJST[0][0], requestTimesJST[0][1]);
    if (requestTimesJST[1]) {
      this.checkTime(requestTimesJST[1][0], requestTimesJST[1][1]);
      this.checkSameTime(requestTimesJST[0], requestTimesJST[1]);
      if (requestTimesJST[2]) {
        this.checkTime(requestTimesJST[2][0], requestTimesJST[2][1]);
        this.checkSameTime(requestTimesJST[0], requestTimesJST[2]);
        this.checkSameTime(requestTimesJST[1], requestTimesJST[2]);
      }
    }
  }

  formatRequestTimes(createApplyDto: CreateApplyDto): Date[][] {
    const requestTimesJST: Date[][] = [];
    requestTimesJST.push([
      getJSTDate(createApplyDto.requestTime1[0]),
      getJSTDate(createApplyDto.requestTime1[1]),
    ]);
    if (createApplyDto.requestTime2) {
      requestTimesJST.push([
        getJSTDate(createApplyDto.requestTime2[0]),
        getJSTDate(createApplyDto.requestTime2[1]),
      ]);
      if (createApplyDto.requestTime3) {
        requestTimesJST.push([
          getJSTDate(createApplyDto.requestTime3[0]),
          getJSTDate(createApplyDto.requestTime3[1]),
        ]);
      }
    }
    return requestTimesJST;
  }

  async checkRequestTime(
    mentorId: string,
    createApplyDto: CreateApplyDto,
  ): Promise<boolean> {
    const requestTimesJST: Date[][] = this.formatRequestTimes(createApplyDto);
    this.checkAvailableTime(requestTimesJST);

    //全てのメンタリングを比べるので性能イッシューが発生する可能性あり
    //リクエストタイムの最大三つの年、月を取り出して、それには当てはまるreservedTimesを区別するロジック
    const reservedTimes = await this.calendarService.getReservedTimes(mentorId);
    if (reservedTimes) {
      const isOverlapped = await this.checkDuplicatedTime(
        reservedTimes,
        createApplyDto,
      );

      if (!isOverlapped) {
        throw new ConflictException(
          'ご指定の候補時間が既にご予約している時間と重なっています',
        );
      }
    }

    return true;
  }

  checkTimeOverlap(requestTime: Date[], originTime: Date[]) {
    if (!requestTime) {
      return true;
    }
    if (
      requestTime[0].getTime() >= originTime[1].getTime() ||
      requestTime[1].getTime() <= originTime[0].getTime()
    ) {
      return true;
    }

    return false;
  }

  async checkDuplicatedTime(
    originRequestTimes: Date[][],
    createApplyDto: CreateApplyDto,
  ): Promise<boolean> {
    const results: boolean[] = originRequestTimes.map((originTime) => {
      if (
        !this.checkTimeOverlap(createApplyDto.requestTime1, originTime) ||
        !this.checkTimeOverlap(createApplyDto.requestTime2, originTime) ||
        !this.checkTimeOverlap(createApplyDto.requestTime3, originTime)
      ) {
        return false;
      }
      return true;
    });
    return results.every((result) => result);
  }

  validateRequestTime(data: CreateApplyDto): void {
    if (
      this.isMentoringOver(data.requestTime1) ||
      this.isMentoringOver(data.requestTime2) ||
      this.isMentoringOver(data.requestTime3)
    ) {
      throw new BadRequestException(
        '過去についてメンとリングを申し込むことはできません',
      );
    }
  }

  isMentoringOver(requestTime: Date[]): boolean {
    const END_TIME = 1;

    if (
      requestTime &&
      requestTime?.[END_TIME].getTime() < new Date().getTime()
    ) {
      return true;
    }
    return false;
  }
}
