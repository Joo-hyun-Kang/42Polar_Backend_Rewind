import { Module } from '@nestjs/common';
import { MentorsController } from './mentors.controller';
import { MentorsService } from './mentors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { MentorsRepository } from './repository/mentors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Mentors])],
  controllers: [MentorsController],
  providers: [MentorsService, MentorsRepository],
})
export class MentorsModule {}
