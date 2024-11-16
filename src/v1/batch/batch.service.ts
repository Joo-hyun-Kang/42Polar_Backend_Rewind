import { Injectable, Logger } from '@nestjs/common';
import { LOG_STATUS } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { MentoringLogsService } from '../mentoring-logs/mentoring-logs.service';
import { EmailService } from '../email/email.service';
import { MailType } from '../mentoring-logs/enum/mail-type.enum';
import { ReportsService } from '../reports/reports.service';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);

  constructor(
    private mentoringLogsService: MentoringLogsService,
    private emailService: EmailService,
    private reportsService: ReportsService,
  ) {}

  async manageMentoringLogsEveryMinute(): Promise<void> {
    const LIMIT_MIN = 10;

    const waitingMentoringLogs =
      await this.mentoringLogsService.getMentoringListByStatus([
        LOG_STATUS.WATING,
      ]);

    const now = new Date();
    this.logger.log(`${now} => Manage Mentoring Logs batch`);
    now.setMinutes(now.getMinutes() + LIMIT_MIN);

    waitingMentoringLogs
      .filter((e) => {
        const twoDaytoMillseconds = 172800000;
        if (e.createdAt.getTime() + twoDaytoMillseconds <= now.getTime()) {
          e.status = LOG_STATUS.CANCEL;
          e.rejectMessage =
            '48時間以内にメンタリングの状態が確定されなかったため、自動的に取り消されました。';
          return true;
        }
        return false;
      })
      .forEach(async (e) => {
        this.logger.log(`Mentoring log's time is over => ${e.id}`);

        try {
          await this.mentoringLogsService.saveMentoringLog(e);

          //メール転送が失敗すれば、emailService.sendMessage関数の中でログを発生する
          this.logger.log(`Send Mail => ${e.id}`);
          this.emailService.sendMessage(e.id, MailType.Cancel);
        } catch (err) {
          this.logger.log(
            `${e.id} + ${err} DBにメンタリング自動取消のBatch失敗`,
          );
        }
      });
  }

  async updateReportMoney(): Promise<void> {
    const now = new Date();
    this.logger.log(`${now} => Update Report Money Logs batch`);

    const completedReports = await this.reportsService.findCompletedReport();

    await Promise.all(
      completedReports.map(async (report) => {
        const money = await this.reportsService.calculateMoneyByTotalHour(
          report,
        );
        report.money = money;
        await this.reportsService.save(report);
      }),
    );
  }
}
