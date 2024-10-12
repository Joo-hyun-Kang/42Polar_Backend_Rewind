import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { MentoringLogsModule } from '../mentoring-logs/mentoring-logs.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [MentoringLogsModule, EmailModule],
  providers: [BatchService],
  exports: [BatchService],
})
export class BatchModule {}
