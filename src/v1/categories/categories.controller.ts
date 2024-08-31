import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';
import { CategoryKeywordsDto } from './dto/category-keyword.dto';

@Controller('/api/v1/categories/')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  /*
   * フロントのメインページでカテゴリー見せる時に使っている
   * 既存コード：そのまま
   */
  @Get()
  async getCategories(): Promise<CategoriesDto[]> {
    return await this.categoriesService.getCategories();
  }

  /*
   * フロントのメンター陣リストページでキーワード見える時に使う
   * 関連コンポネント:KeywordStore
   * 既存コード：データベースコードのクエリ１度で修正、DTO修正、プロントコードDTOに合わせて修正
   */
  @Get('/:category/keywords')
  async getKeywords(
    @Param('category') categoryName: string,
  ): Promise<CategoryKeywordsDto> {
    return this.categoriesService.getKeywords(categoryName);
  }
}
