import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MentorsModule } from '../mentors/mentors.module';
import { BocalsModule } from '../bocals/bocals.module';
import { CadetsModule } from '../cadets/cadets.module';

@Module({
  imports: [MentorsModule, BocalsModule, CadetsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
