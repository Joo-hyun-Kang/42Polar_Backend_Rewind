import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  basicOption,
  entityDynamicOption,
} from './domain/typeorm/data-source-option';
import { CategoriesModule } from './v1/categories/categories.module';
import { RouterModule } from '@nestjs/core';
import { V1Module } from './v1/v1.module';
import { MentorsModule } from './v1/mentors/mentors.module';
import { CommentsModule } from './v1/comments/comments.module';
import { CadetsModule } from './v1/cadets/cadets.module';
import { CalendarModule } from './v1/calendar/calendar.module';
import { MentoringLogsModule } from './v1/mentoring-logs/mentoring-logs.module';
import { ReportsModule } from './v1/reports/reports.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...basicOption, ...entityDynamicOption }),
    RouterModule.register([
      {
        path: 'api/v1',
        module: V1Module,
        children: [
          {
            path: 'categories',
            module: CategoriesModule,
          },
          {
            path: 'mentors',
            module: MentorsModule,
          },
          {
            path: 'comments',
            module: CommentsModule,
          },
          {
            path: 'cadets',
            module: CadetsModule,
          },
          {
            path: 'calendar',
            module: CalendarModule,
          },
          {
            path: 'mentoring-logs',
            module: MentoringLogsModule,
          },
          {
            path: 'reports',
            module: ReportsModule,
          },
        ],
      },
    ]),
    V1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
