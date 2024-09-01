import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './repository/categories.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/domain/typeorm/entity/categories.entity';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { Keywords } from 'src/domain/typeorm/entity/keywords.entity';
import { KeywordCategories } from 'src/domain/typeorm/entity/keywordCategories.entity';
import { MentorKeywords } from 'src/domain/typeorm/entity/mentorKeywords.entity';
import { KeywordsRepository } from './repository/keywords.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Keywords])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository, KeywordsRepository],
})
export class CategoriesModule {}
