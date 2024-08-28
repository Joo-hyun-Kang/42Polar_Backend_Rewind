import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  basicOption,
  entityDynamicOption,
} from './domain/typeorm/data-source-option';
import { CategoriesModule } from './v1/categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...basicOption, ...entityDynamicOption }),
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
