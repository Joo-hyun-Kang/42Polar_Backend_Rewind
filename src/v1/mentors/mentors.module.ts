import { Module } from '@nestjs/common';
import { MentorsService } from './mentors.service';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorsController } from './mentors.controller';
import { MentorsRepository } from './repository/mentors.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Mentors])],
  controllers: [MentorsController],
  providers: [MentorsService, MentorsRepository],
  exports: [MentorsService],
})
export class MentorsModule {}
