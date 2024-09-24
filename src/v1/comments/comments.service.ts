import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { Comments } from 'src/domain/typeorm/entity/comments.entity';
import { CommentDto, CreateCommentDto } from './dto/comment.dto';
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
}
