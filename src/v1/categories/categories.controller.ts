import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';

@Controller('/api/v1/categories/')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async getCategories(): Promise<CategoriesDto[]> {
    return await this.categoriesService.getCategories();
  }
}
