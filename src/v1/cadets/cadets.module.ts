import { Module } from '@nestjs/common';
import { CadetsService } from './cadets.service';

@Module({
  providers: [CadetsService]
})
export class CadetsModule {}
