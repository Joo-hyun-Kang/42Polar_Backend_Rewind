import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { V1Controller } from './v1.controller';
import { MentorsModule } from './mentors/mentors.module';
import { BocalsModule } from './bocals/bocals.module';
import { CadetsModule } from './cadets/cadets.module';
import { MentoringLogsModule } from './mentoring-logs/mentoring-logs.module';
import { CommentsModule } from './comments/comments.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { CalendarModule } from './calendar/calendar.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    CategoriesModule,
    AuthModule,
    MentorsModule,
    BocalsModule,
    CadetsModule,
    MentoringLogsModule,
    CommentsModule,
    RedisModule,
    EmailModule,
    CalendarModule,
    BatchModule,
  ],
  controllers: [V1Controller],
  providers: [],
})
export class V1Module {}
