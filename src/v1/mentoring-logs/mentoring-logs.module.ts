import { forwardRef, Module } from '@nestjs/common';
import { MentoringLogsService } from './mentoring-logs.service';
import { MentoringLogs } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentoringLogsRepository } from './repository/mentoring-logs.repository';
import { JwtModule } from '@nestjs/jwt';
import { ApplyService } from './apply.service';
import { CadetsModule } from '../cadets/cadets.module';
import { MentorsModule } from '../mentors/mentors.module';
import { CalendarModule } from '../calendar/calendar.module';
import { MentoringLogsController } from './mentoring-logs.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([MentoringLogs]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
    forwardRef(() => MentorsModule),
    CadetsModule,
    forwardRef(() => CalendarModule),
  ],
  controllers: [MentoringLogsController],
  providers: [MentoringLogsService, ApplyService, MentoringLogsRepository],
  exports: [MentoringLogsService],
})
export class MentoringLogsModule {}
