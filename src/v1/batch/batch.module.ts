import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch.service';
import { MentoringLogsModule } from '../mentoring-logs/mentoring-logs.module';
import { EmailModule } from '../email/email.module';
import { MentoringLogScheduler } from './mentoring-logs-scheduler';

@Module({
  imports: [MentoringLogsModule, EmailModule, ScheduleModule.forRoot()],
  providers: [BatchService, MentoringLogScheduler],
})
export class BatchModule {}
