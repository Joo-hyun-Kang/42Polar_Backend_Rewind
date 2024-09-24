import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PaginationDto } from '../dto/pagination.dto';
import { CommentPaginationDto } from './dto/comment-pagination.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { ROLES } from '../auth/enum/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RoleGuard } from '../auth/guards/role.guard';
import { User } from '../auth/decorators/user.decorator';
import { JwtInfo } from '../auth/interface/jwt-user.interface';
import { CreateCommentDto } from './dto/comment.dto';

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

  /*
   * メンター詳細ページにコメントを登録するAPI
   * 既存コード：サービスでレポコードを分離、ORM機能に合わせてオブジェクト生成して保存するロジックに置き換え
   */
  @Post(':mentorIntraId')
  @Roles([ROLES.CADET])
  @UseGuards(AuthGuard, RoleGuard)
  async createComment(
    @User() user: JwtInfo,
    @Param('mentorIntraId') mentorIntraId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<boolean> {
    return this.commentService.createComment(
      user.intraId,
      mentorIntraId,
      createCommentDto,
    );
  }
}
