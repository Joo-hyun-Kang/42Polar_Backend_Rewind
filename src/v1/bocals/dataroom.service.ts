import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
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
import * as Excel from 'exceljs';
import { MentoringExcelData } from './interface/mentoring-excel-data.interface';

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

  async patchReportStatusToEdit(reportIdArray: string[]): Promise<boolean> {
    return this.reportsService.updateReportStatusToEdit(reportIdArray);
  }

  async patchReportStatusToDone(reportIdArray: string[]): Promise<boolean> {
    return this.reportsService.updateReportStatusToDone(reportIdArray);
  }

  async updateAllReportStatusToEdit(): Promise<boolean> {
    return this.reportsService.updateAllReportStatusToEdit();
  }

  async updateAllReportStatusToDone(): Promise<boolean> {
    return this.reportsService.updateAllReportStatusToDone();
  }

  async createMentoringExcelFile(reportIds: string[], response): Promise<void> {
    //XLSXファイルに対応するオブジェクトを生成
    const workbook = this.getExcelFile();
    const worksheet = workbook.getWorksheet();

    //レーポットがなければ、NotFoundExceptionが発生する
    const reports = await this.reportsService.findSelectedReports(reportIds);
    const rowData: MentoringExcelData[] = await this.getOneMentoringInfo(
      reports,
    );

    //ローにデータ追加する
    await Promise.all(
      rowData.map(async (rowData) => {
        worksheet.addRow(rowData, 'o+');
      }),
    );

    try {
      await response.writeHead(201, {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      await workbook.xlsx.write(response);
      response.end();
    } catch {
      throw new ConflictException('response 生成中にエラーが発生しました');
    }
  }

  async createMentoringExcelFileAll(response): Promise<void> {
    //XLSXファイルに対応するオブジェクトを生成
    const workbook = this.getExcelFile();
    const worksheet = workbook.getWorksheet();

    //レーポットがなければ、NotFoundExceptionが発生する
    const reports = await this.reportsService.findAllReports();
    const rowData: MentoringExcelData[] = await this.getOneMentoringInfo(
      reports,
    );

    //ローにデータ追加する
    await Promise.all(
      rowData.map(async (rowData) => {
        worksheet.addRow(rowData, 'o+');
      }),
    );

    try {
      await response.writeHead(201, {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      await workbook.xlsx.write(response);
      response.end();
    } catch {
      throw new ConflictException('response 生成中にエラーが発生しました');
    }
  }

  async getOneMentoringInfo(reports: Reports[]): Promise<MentoringExcelData[]> {
    const mentoringExcelData = await Promise.all(
      reports.map(async (report): Promise<MentoringExcelData> => {
        const mentor = await report.mentors;
        const cadet = await report.cadets;
        return {
          mentorName: mentor.name,
          mentorIntraId: mentor.intraId,
          mentorCompany: mentor.company,
          mentorDuty: mentor.duty,
          date: report.mentoringLogs.meetingAt[0].toLocaleDateString('ja-JP'),
          place: report.place,
          isCommon: cadet.isCommon ? '共通' : '深化',
          startTime: report.mentoringLogs.meetingAt[0]
            .toTimeString()
            .slice(
              0,
              report.mentoringLogs.meetingAt[0].toTimeString().lastIndexOf(':'),
            ),
          endTime: report.mentoringLogs.meetingAt[1]
            .toTimeString()
            .slice(
              0,
              report.mentoringLogs.meetingAt[0].toTimeString().lastIndexOf(':'),
            ),
          totalHour:
            Math.floor(
              ((report.mentoringLogs.meetingAt[1].getTime() -
                report.mentoringLogs.meetingAt[0].getTime()) /
                (1000 * 60 * 60)) *
                10,
            ) / 10,
          money: report.money,
          cadetName: report.extraCadets
            ? `${cadet.name}(${cadet.intraId}, ${report.extraCadets})`
            : `${cadet.name}(${cadet.intraId})`,
        };
      }),
    );

    return mentoringExcelData;
  }

  getExcelFile() {
    //XLSXファイルに対応するオブジェクトを生成
    const workbook = new Excel.Workbook();

    //新しいワークシートを生成
    const worksheet = workbook.addWorksheet('Mentoring', {
      views: [
        {
          state: 'frozen', //スクロールが固定する枠が決まる
          ySplit: 1, // How many rows to freeze.
          activeCell: 'B5', // The currently selected cell
        },
      ],
      properties: { defaultRowHeight: 20 },
    });

    //コラムのセット
    worksheet.columns = [
      {
        header: 'メンター',
        key: 'mentorName',
        width: 10,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: 'intra ID',
        key: 'mentorIntraId',
        width: 10,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: '会社',
        key: 'mentorCompany',
        width: 20,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: '職級',
        key: 'mentorDuty',
        width: 15,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: 'お出会する時刻',
        key: 'date',
        width: 15,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: '場所',
        key: 'place',
        width: 15,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: '区分',
        key: 'isCommon',
        width: 13,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: '開始時刻',
        key: 'startTime',
        width: 10,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: '終了時刻',
        key: 'endTime',
        width: 10,
        style: { alignment: { horizontal: 'center' } },
      },
      {
        header: 'メンタリング時間',
        key: 'totalHour',
        width: 13,
        style: { alignment: { horizontal: 'right' } },
      },
      {
        header: '金額',
        key: 'money',
        width: 13,
        style: { alignment: { horizontal: 'right' }, numFmt: '#,##0' },
      },
      {
        header: 'メンティー',
        key: 'cadetName',
        width: 10,
        style: { alignment: { horizontal: 'center' } },
      },
    ];

    // 最初のローのセット
    // Iterate over all non-null cells in a row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { horizontal: 'center' };
    });

    return workbook;
  }
}
