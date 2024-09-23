import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorsController } from './mentors.controller';
import { MentorsRepository } from './repository/mentors.repository';
import { JwtModule } from '@nestjs/jwt';
import { MentoringLogsModule } from '../mentoring-logs/mentoring-logs.module';
import { MentorKeywords } from 'src/domain/typeorm/entity/mentorKeywords.entity';
import { MentorKeywordsService } from './mentorKeywords.service';
import { MentorKeywordsRepository } from './repository/mentorKeywords.repository';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mentors, MentorKeywords]),
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
    CategoriesModule,
  ],
  controllers: [MentorsController],
  providers: [
    MentorsService,
    MentorsRepository,
    MentorKeywordsService,
    MentorKeywordsRepository,
  ],
  exports: [MentorsService],
})
export class MentorsModule {}
