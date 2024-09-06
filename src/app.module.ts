import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  basicOption,
  entityDynamicOption,
} from './domain/typeorm/data-source-option';
import { CategoriesModule } from './v1/categories/categories.module';
import { RouterModule } from '@nestjs/core';
import { V1Module } from './v1/v1.module';

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
        ],
      },
    ]),
    V1Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
