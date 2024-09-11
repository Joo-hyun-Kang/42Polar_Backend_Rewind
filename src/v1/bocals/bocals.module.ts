import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bocals } from 'src/domain/typeorm/entity/bocal.entity';
import { BocalsService } from './bocals.service';
import { BocalsRepository } from './bocals.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Bocals])],
  providers: [BocalsService, BocalsRepository],
  exports: [BocalsService],
})
export class BocalsModule {}
