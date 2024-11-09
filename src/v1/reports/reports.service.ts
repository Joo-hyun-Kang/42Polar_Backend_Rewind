import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  MethodNotAllowedException,
} from '@nestjs/common';
import { MentoringLogsService } from 'src/v1/mentoring-logs/mentoring-logs.service';
import { LOG_STATUS } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import {
  REPORT_STATUS,
  Reports,
} from 'src/domain/typeorm/entity/reports.entity';
import { ReportsRepository } from './repository/reports.repository';
import { ReportDto } from './dto/report.dto';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { UpdateReportDto } from './dto/update-report.dto';
import { getTotalHour, toDate } from '../util/utils';
import { DataSource } from 'typeorm';
import { FileSavePath } from 'src/app.module';
import * as fs from 'fs';
import { ParsedReportQueryDto } from '../bocals/dto/parsed-report-query.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly mentoringLogsService: MentoringLogsService,
    private readonly reportsRepository: ReportsRepository,
    private readonly dataSource: DataSource,
  ) {}

  async createReport(mentoringLogId: string): Promise<string> {
    const mentoringLog = await this.mentoringLogsService.findMentoringLogsById(
      mentoringLogId,
    );

    const currentReport = await mentoringLog.reports;
    if (currentReport) {
      throw new MethodNotAllowedException(
        '当てはまるメンタリングログは既に報告書を持っています',
      );
    }

    if (mentoringLog.status !== LOG_STATUS.DONE) {
      throw new MethodNotAllowedException(
        'メンタリング完了の状態で報告書を生成ができます',
      );
    }

    const report: Reports = new Reports();
    report.cadets = mentoringLog.cadets;
    report.mentors = mentoringLog.mentors;
    report.mentoringLogs = mentoringLog;
    report.money = 0;
    report.imageUrl = [];
    report.status = REPORT_STATUS.WRITING;

    mentoringLog.reports = Promise.resolve(report);

    //saveが失敗すれば、例外が発生する
    await this.mentoringLogsService.saveMentoringLog(mentoringLog);
    //saveが失敗すれば、例外が発生する
    const savedReport = await this.save(report);

    return savedReport.id;
  }

  async save(report: Reports): Promise<Reports> {
    const savedReport = await this.reportsRepository.save(report);
    if (savedReport) {
      return savedReport;
    }

    return null;
  }

  async getReport(reportId: string): Promise<ReportDto> {
    const report: Reports = await this.reportsRepository.findReportById(
      reportId,
    );

    const host = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    const currentsignatureUrl = report.signatureUrl
      ? host + report.signatureUrl
      : report.signatureUrl;
    const currentImageUrl = report.imageUrl.map((e) => {
      return host + e;
    });

    const mentor = await report.mentors;
    const cadet = await report.cadets;
    const mentoringLogs = await report.mentoringLogs;

    return {
      id: report.id,
      mentors: { name: mentor.name },
      cadets: {
        name: cadet.name,
        isCommon: cadet.isCommon,
        intraId: cadet.intraId,
      },
      extraCadets: report.extraCadets,
      place: report.place,
      topic: report.topic,
      content: report.content,
      imageUrl: currentImageUrl,
      signatureUrl: currentsignatureUrl,
      feedbackMessage: report.feedbackMessage,
      feedback1: report.feedback1,
      feedback2: report.feedback2,
      feedback3: report.feedback3,
      money: report.money,
      status: report.status,
      mentoringLogs: mentoringLogs,
      updatedAt: report.updatedAt,
      createdAt: report.createdAt,
    };
  }

  async validateAuthorization(userInfo: JwtInfo, reportId: string) {
    //レポートがなければ、例外が発生する。
    const report: Reports = await this.reportsRepository.findReportById(
      reportId,
    );

    let isBocal: boolean;
    if (userInfo.role === 'bocal') {
      isBocal = true;
    } else {
      isBocal = false;
    }

    const mentor = await report.mentors;
    if (!isBocal && mentor.intraId !== userInfo.intraId) {
      throw new ForbiddenException(process.env.UNAUTHORIZEDEXCEPTION);
    }
  }

  /*
   * @Patch
   */
  async updateReport(
    reportId: string,
    body: UpdateReportDto,
    userInfo: JwtInfo,
  ): Promise<boolean> {
    //レポートがなければ、例外が発生する。
    const report: Reports = await this.reportsRepository.findReportById(
      reportId,
    );

    let isBocal: boolean;
    if (userInfo.role === 'bocal') {
      isBocal = true;
    } else {
      isBocal = false;
    }

    if (!this.isUpdatableReport(report.status) && !isBocal) {
      throw new BadRequestException('該当するレポートを修正できない状態です。');
    }

    if (body.meetingAt) {
      try {
        if (!(body.meetingAt instanceof Date)) {
          body.meetingAt = [
            toDate(body.meetingAt[0]),
            toDate(body.meetingAt[1]),
          ];
        }
      } catch (err) {
        console.error(err);
        throw new BadRequestException('正しいDate型がありません。');
      }
    }

    if (body.meetingAt[0].getTime() > Date.now()) {
      throw new BadRequestException(
        'メンタリングが行われた時間を現視点より前に指定することはできません。',
      );
    }

    const totalHour: number = getTotalHour(body.meetingAt);
    if (totalHour <= 0) {
      throw new BadRequestException(
        'メンタリングの時間は０以下にはなれません。',
      );
    }

    const mentoringLogs = await this.mentoringLogsService.findMentoringLogsById(
      report.mentoringLogs.id,
    );

    mentoringLogs.meetingAt = body.meetingAt;
    mentoringLogs.meetingStart = body.meetingAt[0];

    report.mentoringLogs.meetingAt = body.meetingAt;
    report.mentoringLogs.meetingStart = body.meetingAt[0];
    report.extraCadets = body.extraCadets;
    report.place = body.place;
    report.topic = body.topic;
    report.content = body.content;
    report.feedbackMessage = body.feedbackMessage;
    report.feedback1 = body.feedback1 ? +body.feedback1 : report.feedback1;
    report.feedback2 = body.feedback2 ? +body.feedback2 : report.feedback2;
    report.feedback3 = body.feedback3 ? +body.feedback3 : report.feedback3;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.mentoringLogsService.updateMentoringLogByQueryRunner(
        mentoringLogs,
        queryRunner,
      );
      await this.reportsRepository.updateReportByQueryRunner(
        report,
        queryRunner,
      );

      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SAVE);
    } finally {
      await queryRunner.release();
    }

    //臨時保存ではなく、最終的に保存する場合
    if (body.isDone) {
      const doneReport = await this.setReportDoneAndMoney(report);
      await this.reportsRepository.save(doneReport);
    }

    return true;
  }

  async setReportDoneAndMoney(report: Reports): Promise<Reports> {
    if (!this.isEnteredReport(report)) {
      throw new BadRequestException('レポートが完成していないません。');
    }

    //１ヶ月に最大限１０万円限度がある
    const money: number = await this.calculateMoneyByTotalHour(report);
    report.money = money;
    report.status = REPORT_STATUS.DONE;

    return report;
  }

  isEnteredReport(report: Reports): boolean {
    if (
      !report?.imageUrl?.length ||
      !report.signatureUrl ||
      !report.topic ||
      !report.place ||
      !report.content ||
      !report.feedbackMessage ||
      !report.feedback1 ||
      !report.feedback2 ||
      !report.feedback3
    ) {
      return false;
    }
    return true;
  }

  isUpdatableReport(reportStatus: string): boolean {
    if (
      reportStatus === REPORT_STATUS.UNABLE ||
      reportStatus === REPORT_STATUS.DONE ||
      reportStatus === REPORT_STATUS.ERROR
    ) {
      return false;
    }
    return true;
  }

  async calculateMoneyByTotalHour(report: Reports): Promise<number> {
    //１ヶ月に最大限１０万円限度がある
    const MONTH_LIMIT = 100000;
    const pay = 10000;

    const mentorId: string = (await report.mentors).id;
    const mentoringLog = await report.mentoringLogs;
    const start: Date = mentoringLog.meetingAt[0];
    const end: Date = mentoringLog.meetingAt[1];

    let money: number = Math.floor(getTotalHour([start, end])) * pay;

    const finishedReports: Reports[] =
      await this.reportsRepository.getCompletedReportsByMentor(mentorId);

    let monthlyTotal = 0;
    if (finishedReports) {
      finishedReports.forEach((report) => {
        if (report.mentoringLogs.meetingAt[0].getMonth() === start.getMonth()) {
          monthlyTotal += report.money;
        }
      });
    }

    if (monthlyTotal >= MONTH_LIMIT) {
      return 0;
    }

    if (monthlyTotal + money >= MONTH_LIMIT) {
      money = MONTH_LIMIT - monthlyTotal;
    }

    return money;
  }

  async uploadImageAndSignature(
    reportId: string,
    image: Express.Multer.File,
    signature: Express.Multer.File,
  ): Promise<void> {
    if (!image && !signature) {
      return;
    }

    let imageUrl = null;
    let signatureUrl = null;
    //データベースにはサーバーのURLは除いで保存しているので、GetのAPIからサーバーのURLを追加が必要
    //データベースに保存した後、URLが更新される場合を防止
    if (image && image.filename) {
      imageUrl = `${FileSavePath.Path}/${image.filename}`;
    }
    if (signature && signature.filename) {
      signatureUrl = `${FileSavePath.Path}/${signature.filename}`;
    }

    const report = await this.reportsRepository.findReportById(reportId);

    if (image) {
      if (report.imageUrl.length < 2) {
        report.imageUrl.push(imageUrl);
      } else {
        // 保存された写真がある場合は、現在アップロードされた写真削除
        // DBにある写真はそのまま、維持→ユーザーの削除は削除APIから可能
        await this.deleteFile(image.path);
      }
    }

    if (signature) {
      report.signatureUrl = signatureUrl;
    }

    await this.reportsRepository.save(report);
  }

  async deleteImageAndSignature(
    reportId: string,
    imageIndex: number,
    signature: string,
  ) {
    const report = await this.reportsRepository.findReportById(reportId);

    if (
      !isNaN(imageIndex) &&
      imageIndex >= 0 &&
      report.imageUrl.length > imageIndex
    ) {
      this.deleteFile(process.cwd() + report.imageUrl[imageIndex]);
      report.imageUrl.splice(imageIndex, 1);
    }

    if (signature && report.signatureUrl) {
      this.deleteFile(process.cwd() + report.signatureUrl);
      report.signatureUrl = null;
    }

    this.reportsRepository.save(report);
  }

  async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          throw new Error('ファイルの削除に失敗しました');
        }
      });
    } else {
      throw new ConflictException(
        '指定されたファイルを削除することに失敗しました',
      );
    }
  }

  async findAndCountReports(parsedReportQueryDto: ParsedReportQueryDto) {
    return await this.reportsRepository.findAndCountReports(
      parsedReportQueryDto,
    );
  }

  async updateReportStatusToEdit(reportIdArray: string[]): Promise<boolean> {
    return this.reportsRepository.updateReportStatusToEdit(reportIdArray);
  }

  async updateReportStatusToDone(reportIdArray: string[]): Promise<boolean> {
    return this.reportsRepository.updateReportStatusToDone(reportIdArray);
  }

  async updateAllReportStatusToEdit(): Promise<boolean> {
    return this.reportsRepository.updateAllReportStatusToEdit();
  }

  async updateAllReportStatusToDone(): Promise<boolean> {
    return this.reportsRepository.updateAllReportStatusToDone();
  }

  async findSelectedReports(reportIds: string[]): Promise<Reports[]> {
    return this.reportsRepository.findSelectedReports(reportIds);
  }
}
