import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { JwtModule } from '@nestjs/jwt';
import { MentoringLogsModule } from '../mentoring-logs/mentoring-logs.module';
import { MentorsModule } from '../mentors/mentors.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
    MentoringLogsModule,
    MentorsModule,
  ],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
