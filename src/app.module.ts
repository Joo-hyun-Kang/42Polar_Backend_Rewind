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
import { Cadets } from './domain/typeorm/entity/cadets.entity';
import { CadetsModule } from './v1/cadets/cadets.module';

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
        ],
      },
    ]),
    V1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
