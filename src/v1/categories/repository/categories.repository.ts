import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/domain/typeorm/entity/categories.entity';
import { Repository } from 'typeorm';
import { CategoriesDto } from '../dto/categories.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories(): Promise<Categories[]> {
    return await this.categoriesRepository.find();
  }
}
