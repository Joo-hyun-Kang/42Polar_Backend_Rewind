import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MentorsModule } from '../mentors/mentors.module';
import { BocalsModule } from '../bocals/bocals.module';
import { CadetsModule } from '../cadets/cadets.module';
import { JwtModule } from '@nestjs/jwt';
import { BullQueueModule } from '../redis/bull-queue.module';

@Module({
  imports: [
    MentorsModule,
    BocalsModule,
    CadetsModule,
    BullQueueModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
