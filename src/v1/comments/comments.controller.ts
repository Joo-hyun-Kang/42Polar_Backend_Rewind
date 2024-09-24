import { Controller, Get, Param, Query } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PaginationDto } from '../dto/pagination.dto';
import { CommentPaginationDto } from './dto/comment-pagination.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  /*
   * メンター詳細ページにコメントを見せるAPI
   * 既存コード：サービスでレポコードを分離、ORM遅延ローディンによる非同期適用
   */
  @Get(':mentorIntraId')
  async getComment(
    @Param('mentorIntraId') mentorIntraId: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<CommentPaginationDto> {
    return await this.commentService.getCommentPagination(
      mentorIntraId,
      paginationDto,
    );
  }
}
