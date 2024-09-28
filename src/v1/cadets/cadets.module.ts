import { Module } from '@nestjs/common';
import { CadetsService } from './cadets.service';
import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CadetsRepository } from './repository/cadets.repository';
import { CadetsController } from './cadets.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cadets]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
  ],
  providers: [CadetsService, CadetsRepository],
  controllers: [CadetsController],
  exports: [CadetsService],
})
export class CadetsModule {}
