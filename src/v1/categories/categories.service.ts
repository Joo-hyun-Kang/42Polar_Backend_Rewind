import { Injectable } from '@nestjs/common';
import { CategoriesDto } from './dto/categories.dto';
import { CategoriesRepository } from './repository/categories.repository';

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
}
