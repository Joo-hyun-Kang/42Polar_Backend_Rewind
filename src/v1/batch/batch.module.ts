import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch.service';
import { MentoringLogsModule } from '../mentoring-logs/mentoring-logs.module';
import { EmailModule } from '../email/email.module';
import { MentoringLogScheduler } from './mentoring-logs-scheduler';
import { ReportsModule } from '../reports/reports.module';
import { ReportsScheduler } from './reports-scheduler';

@Module({
  imports: [
    MentoringLogsModule,
    EmailModule,
    ReportsModule,
    ScheduleModule.forRoot(),
  ],
  providers: [BatchService, MentoringLogScheduler, ReportsScheduler],
})
export class BatchModule {}
