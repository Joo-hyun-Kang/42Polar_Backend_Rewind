import { Module } from '@nestjs/common';
import { MentoringLogsService } from './mentoring-logs.service';
import { MentoringLogs } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoringLogsRepository } from './repository/mentoring-logs.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MentoringLogs])],
  providers: [MentoringLogsService, MentoringLogsRepository],
  exports: [MentoringLogsService],
})
export class MentoringLogsModule {}
