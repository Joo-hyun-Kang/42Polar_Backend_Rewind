import { Injectable } from '@nestjs/common';
import { commentsRepository } from './repository/comments.repository';
import { PaginationDto } from '../dto/pagination.dto';
import { Comments } from 'src/domain/typeorm/entity/comments.entity';
import { CommentDto } from './dto/comment.dto';
import { CommentPaginationDto } from './dto/comment-pagination.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: commentsRepository) {}
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
}
