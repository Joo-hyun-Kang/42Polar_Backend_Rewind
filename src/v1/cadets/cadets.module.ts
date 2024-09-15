import { Module } from '@nestjs/common';
import { CadetsService } from './cadets.service';
import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CadetsRepository } from './repository/cadets.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Cadets])],
  providers: [CadetsService, CadetsRepository],
  exports: [CadetsService],
})
export class CadetsModule {}
