import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PaginationReportDto,
  ReportResolved,
} from './dto/pagination-report.dto';
import {
  REPORT_STATUS,
  Reports,
} from 'src/domain/typeorm/entity/reports.entity';
import { ParsedReportQueryDto } from './dto/parsed-report-query.dto';
import { ReportQueryRowDto } from './dto/report-query-row.dto';
import { addMonths, getJSTDate, toDate } from '../util/utils';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class DataroomService {
  constructor(private readonly reportsService: ReportsService) {}

  parseReportQueryRowDto(
    reportQueryRowDto: ReportQueryRowDto,
  ): ParsedReportQueryDto {
    const parsedReportQueryDto: ParsedReportQueryDto = {
      take: reportQueryRowDto.take,
      page: reportQueryRowDto.page,
    };

    // class-validatorの@Type(() => Boolean)が作動していないので、 直接に実装
    if (reportQueryRowDto.isAscending) {
      let isBoolean = false;
      let parsedIsAscending = false;
      if (reportQueryRowDto.isAscending === 'true') {
        isBoolean = true;
        parsedIsAscending = true;
      } else if (reportQueryRowDto.isAscending === 'false') {
        isBoolean = true;
        parsedIsAscending = false;
      } else {
        isBoolean = false;
      }

      if (isBoolean) {
        parsedReportQueryDto.isAscending = parsedIsAscending;
      } else {
        throw new BadRequestException('正しいBooleanの型がありません。');
      }
    }

    if (reportQueryRowDto.date) {
      //文字列をJST基準に変換
      const startUTC = toDate(reportQueryRowDto.date);
      const startJST = getJSTDate(startUTC);

      //ユーザーが指定した年、月に当てはまる報告書をDBで紹介するため
      //ユーザーが2024-11を入力すると、最後の日である2024-11-30を計算する
      const ONE_DAY = 1000 * 60 * 60 * 24;
      const lastDayOfStartJSTMonth = new Date(
        addMonths(startJST, 1).getTime() - ONE_DAY,
      );

      parsedReportQueryDto.startDate = startJST;
      parsedReportQueryDto.endDate = lastDayOfStartJSTMonth;
    } else {
      parsedReportQueryDto.startDate = new Date(0);
      parsedReportQueryDto.endDate = new Date();
    }

    if (reportQueryRowDto.mentorName) {
      parsedReportQueryDto.mentorName = reportQueryRowDto.mentorName;
    }

    if (reportQueryRowDto.mentorIntra) {
      parsedReportQueryDto.mentorIntra = reportQueryRowDto.mentorIntra;
    }

    if (reportQueryRowDto.status) {
      const REPORT_STATUS_ELEMENTS = [
        REPORT_STATUS.UNABLE,
        REPORT_STATUS.ABLE,
        REPORT_STATUS.WRITING,
        REPORT_STATUS.DONE,
        REPORT_STATUS.FIXING,
        REPORT_STATUS.ERROR,
      ];

      let isReportStatus = false;
      const parsedReportStatus = REPORT_STATUS_ELEMENTS.filter((e) => {
        if (e === reportQueryRowDto.status) {
          isReportStatus = true;
          return true;
        }
      });

      if (isReportStatus) {
        parsedReportQueryDto.status = parsedReportStatus[0];
      } else {
        throw new BadRequestException('正しい報告書の型がありません。');
      }
    }

    return parsedReportQueryDto;
  }

  async getReportPagination(
    parsedReportQueryDto: ParsedReportQueryDto,
  ): Promise<PaginationReportDto> {
    const result: [Reports[], number] =
      await this.reportsService.findAndCountReports(parsedReportQueryDto);

    const resolvedReports: ReportResolved[] = await Promise.all(
      result[0].map(async (e) => {
        return {
          id: e.id,
          extraCadets: e.extraCadets,
          place: e.place,
          topic: e.topic,
          content: e.content,
          imageUrl: e.imageUrl,
          signatureUrl: e.signatureUrl,
          feedbackMessage: e.feedbackMessage,
          feedback1: e.feedback1,
          feedback2: e.feedback2,
          feedback3: e.feedback3,
          money: e.money,
          status: e.status,
          mentoringLogs: e.mentoringLogs,
          updatedAt: e.updatedAt,
          createdAt: e.createdAt,
          mentors: await e.mentors,
          cadets: await e.cadets,
        };
      }),
    );

    return { reports: resolvedReports, total: result[1] };
  }
}
