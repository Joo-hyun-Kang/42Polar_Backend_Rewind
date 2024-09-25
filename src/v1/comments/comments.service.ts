import { ForbiddenException, Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { Comments } from 'src/domain/typeorm/entity/comments.entity';
import {
  CommentDto,
  CreateCommentDto,
  UpdateCommentDto,
} from './dto/comment.dto';
import { CommentPaginationDto } from './dto/comment-pagination.dto';
import { CadetsService } from '../cadets/cadets.service';
import { MentorsService } from '../mentors/mentors.service';
import { CommentsRepository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly cadetsService: CadetsService,
    private readonly mentorsService: MentorsService,
  ) {}
  async getCommentPagination(
    mentorIntra: string,
    paginationDto: PaginationDto,
  ): Promise<CommentPaginationDto> {
    const result: [Comments[], number] =
      await this.commentsRepository.getCommentLists(mentorIntra, paginationDto);

    const COMMENTS_LIST_INDEX = 0;
    const commentDtos: CommentDto[] = await Promise.all(
      result[COMMENTS_LIST_INDEX].map(async (comment) => {
        const cadet = await comment.cadets;
        return {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          cadets: {
            intraId: cadet.intraId,
            profileImage: cadet.profileImage,
          },
        };
      }),
    );

    const COMMENTS_COUNT_INDEX = 1;
    return { comments: commentDtos, total: result[COMMENTS_COUNT_INDEX] };
  }

  async createComment(
    cadetIntraId: string,
    mentorIntaId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<boolean> {
    //２行全部、なければ、例外が生じる
    const cadet = await this.cadetsService.findCadetByIntraId(cadetIntraId);
    const mentor = await this.mentorsService.findByIntra(mentorIntaId);

    const comment = new Comments();
    comment.content = createCommentDto.content;
    //Promise使用なしにすぐ割り当てても良いけど、上端のコードで生徒、メンターの存在有無を明瞭にするため
    comment.cadets = Promise.resolve(cadet);
    comment.mentors = Promise.resolve(mentor);

    return this.commentsRepository.saveComment(comment);
  }

  async updateComment(
    cadetIntraId: string,
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<boolean> {
    const comment = await this.commentsRepository.findCommentById(commentId);
    //Cadetリレーションがnullの場合、?を省略すると、NULL EXCEPTIONが発生します。
    const cadetId = (await comment.cadets)?.intraId;

    if (cadetIntraId !== cadetId) {
      throw new ForbiddenException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    comment.content = updateCommentDto.content;

    return this.commentsRepository.saveComment(comment);
  }

  async deleteComment(
    cadetIntraId: string,
    commentId: string,
  ): Promise<boolean> {
    const comment = await this.commentsRepository.findCommentById(commentId);
    //Cadetリレーションがnullの場合、?を省略すると、NULL EXCEPTIONが発生します。
    const cadetId = (await comment.cadets)?.intraId;

    if (cadetIntraId !== cadetId) {
      throw new ForbiddenException(process.env.UNAUTHORIZEDEXCEPTION);
    }

    comment.isDeleted = true;
    comment.deletedAt = new Date();

    return this.commentsRepository.saveComment(comment);
  }
}
