import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { MentorsRepository } from './mentors.repository';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Mentors])],
  providers: [MentorsService, MentorsRepository],
  exports: [MentorsService],
})
export class MentorsModule {}
