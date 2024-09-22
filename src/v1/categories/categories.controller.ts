import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesDto } from './dto/categories.dto';
import { CategoryKeywordsDto } from './dto/category-keyword.dto';
import { MentorKeywordsDto } from './dto/mentor-keywords.dto';
import { MentorsListByCategory } from './dto/mentors-list.interface';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';

@Controller()
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
   * メンター詳細ページでメンタが自分のキーワードを追加、削除する時に使う
   * 既存コード：サービズからレポジトリロジック分離、DBデータを返すDTOに変換の際、Promise.All利用して非同期処理
   */
  @Roles([ROLES.MENTOR])
  @UseGuards(AuthGuard, RoleGuard)
  @Get('/category/keywords')
  async getCategoriesWithKeywords(): Promise<CategoryKeywordsDto[]> {
    return await this.categoriesService.getAllCategoryKeyword();
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

  /*
   * フロントのメンターリストページでメンターを表示する
   * 既存コード：データベースコードのクエリの回数を４回から2回に修正、DTOの修正、リファクタリングによりコード量が削減された
   */
  @Get(':category')
  async getMentors(
    @Query() mentorKeywordsDto: MentorKeywordsDto,
    @Param('category') categoryName: string,
  ): Promise<MentorsListByCategory> {
    const {
      keywords: reqesutKeywords,
      mentorName: requestMentorNameOrIntraId,
    } = mentorKeywordsDto;

    //category検証
    //カテゴリーが存在していること保証する
    let category: CategoryKeywordsDto = null;
    try {
      category = await this.categoriesService.getKeywords(categoryName);
    } catch (err) {
      throw new BadRequestException('間違いカテゴリーが含めらています');
    }

    //キーワードがない場合、アーリーリターン
    //mentorを取るためにキーワードが必要
    if (category.keywords.length === 0) {
      return {
        categoryName: category.category,
        mentorCount: 0,
        mentors: [],
      };
    }

    //Keyword検証
    //クエリパラメータのキーワードがカテゴリーに含まれていることを保証する
    if (reqesutKeywords?.length > 0) {
      const isKeywordIn = reqesutKeywords.every((reqesutKeyword) => {
        return category.keywords.includes(reqesutKeyword);
      });

      if (isKeywordIn == false) {
        throw new BadRequestException('間違いキーワードが含めらています');
      }
    }

    return await this.categoriesService.getMentorListFromCategory(
      category,
      reqesutKeywords,
      requestMentorNameOrIntraId,
    );
  }
}
