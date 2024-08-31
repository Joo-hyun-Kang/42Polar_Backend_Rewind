import { Injectable } from '@nestjs/common';
import { CategoriesDto } from './dto/categories.dto';
import { CategoriesRepository } from './repository/categories.repository';
import { Categories } from 'src/domain/typeorm/entity/categories.entity';
import { CategoryKeywordsDto } from './dto/category-keyword.dto';
import { keywordCategoriesData } from 'src/domain/typeorm/seeder/data/keyword-categories-data';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<CategoriesDto[]> {
    const categories = await this.categoriesRepository.getCategories();
    const categoriesNames: CategoriesDto[] = categories.map((category) => {
      return {
        name: category.name,
      };
    });
    return categoriesNames;
  }

  async getKeywords(categoryName: string): Promise<CategoryKeywordsDto> {
    const categoryKeyword: Categories =
      await this.categoriesRepository.getRelatedCategoryKeyword(categoryName);

    console.log(categoryKeyword);

    const result: CategoryKeywordsDto = {
      category: categoryKeyword.name,
      keywords: await Promise.all(
        (
          await categoryKeyword.keywordCategories
        ).map(async (e) => {
          const keyword = await e.keywords;
          return keyword.name;
        }),
      ),
    };

    return result;
  }
}
