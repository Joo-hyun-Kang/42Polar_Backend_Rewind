import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/domain/typeorm/entity/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories(): Promise<Categories[]> {
    const takeCount = 8;

    let findedCategoires: Categories[];

    try {
      findedCategoires = await this.categoriesRepository.find({
        select: {
          name: true,
        },
        take: takeCount,
      });
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!findedCategoires) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return findedCategoires;
  }

  //Categories->KeywordCategories->Keywordのデータを持っているオブジェクトを返す
  async getRelatedCategoryKeyword(name: string): Promise<Categories> {
    let category: Categories;

    try {
      category = await this.categoriesRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.keywordCategories', 'keywordCategories')
        .leftJoinAndSelect('keywordCategories.keywords', 'keywords')
        .where('category.name = :name', { name })
        .getOne();
    } catch (error) {
      throw new ConflictException(error, process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!category) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return category;
  }
}
