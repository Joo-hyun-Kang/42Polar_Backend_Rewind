import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bocals } from 'src/domain/typeorm/entity/bocal.entity';
import { BocalsService } from './bocals.service';
import { BocalsRepository } from './repository/bocals.repository';
import { BocalsController } from './bocals.controller';
import { JwtModule } from '@nestjs/jwt';
import { ReportsModule } from '../reports/reports.module';
import { DataroomService } from './dataroom.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bocals]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
    ReportsModule,
  ],
  controllers: [BocalsController],
  providers: [BocalsService, DataroomService, BocalsRepository],
  exports: [BocalsService],
})
export class BocalsModule {}
