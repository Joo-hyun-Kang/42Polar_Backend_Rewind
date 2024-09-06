import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { MentorsModule } from './mentors/mentors.module';

@Module({
  imports: [CategoriesModule, MentorsModule],
  controllers: [],
  providers: [],
})
export class V1Module {}
