import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { MentoringLogsService } from 'src/v1/mentoring-logs/mentoring-logs.service';
import { LOG_STATUS } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import {
  REPORT_STATUS,
  Reports,
} from 'src/domain/typeorm/entity/reports.entity';
import { ReportsRepository } from './repository/reports.repository';

@Injectable()
export class ReportsService {
  constructor(
    private readonly mentoringLogsService: MentoringLogsService,
    private readonly reportsRepository: ReportsRepository,
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
}
