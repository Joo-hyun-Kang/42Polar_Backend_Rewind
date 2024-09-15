import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorsController } from './mentors.controller';
import { MentorsRepository } from './repository/mentors.repository';
import { JwtModule } from '@nestjs/jwt';
import { MentoringLogsModule } from '../mentoring-logs/mentoring-logs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mentors]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          global: true,
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRE },
        };
      },
    }),
    MentoringLogsModule,
  ],
  controllers: [MentorsController],
  providers: [MentorsService, MentorsRepository],
  exports: [MentorsService],
})
export class MentorsModule {}
