import { Injectable } from '@nestjs/common';
import { CategoriesDto } from './dto/categories.dto';
import { CategoriesRepository } from './repository/categories.repository';
import { Categories } from 'src/domain/typeorm/entity/categories.entity';
import { CategoryKeywordsDto } from './dto/category-keyword.dto';
import { MentorsListByCategory } from './dto/mentors-list.interface';
import { KeywordsRepository } from './repository/keywords.repository';
import { MentorsListElement } from './dto/mentors-list-element.interface';

export interface MentorRawSimpleInfo {
  id: string;
  name: string;
  intraid: string;
  count: number;
  tags: string[];
  profileimage: string;
  introduction: string;
  isactive: boolean;
}

@Injectable()
export class CategoriesService {
  constructor(
    private categoriesRepository: CategoriesRepository,
    private keywordsRepository: KeywordsRepository,
  ) {}

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

  async getMentorListFromCategory(
    categoryKeyword: CategoryKeywordsDto,
    reqesutKeywords: string[],
    requestMentorNameOrIntraId: string,
  ): Promise<MentorsListByCategory> {
    // 選択されたキーワードの抽出
    const filterdCategoryKeyword =
      reqesutKeywords?.length > 0 ? reqesutKeywords : categoryKeyword.keywords;

    const mentorList: MentorsListElement[] =
      await this.keywordsRepository.getMentorsByKeywords(
        filterdCategoryKeyword,
        requestMentorNameOrIntraId,
      );

    return {
      categoryName: categoryKeyword.category,
      mentorCount: mentorList.length,
      mentors: mentorList,
    };
  }
}
