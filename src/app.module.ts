import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  basicOption,
  entityDynamicOption,
} from './domain/typeorm/data-source-option';

@Module({
  imports: [TypeOrmModule.forRoot({ ...basicOption, ...entityDynamicOption })],
  controllers: [],
  providers: [],
})
export class AppModule {}
