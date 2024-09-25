import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/domain/typeorm/entity/comments.entity';
import { PaginationDto } from 'src/v1/dto/pagination.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comments)
    private readonly commentsRepository: Repository<Comments>,
  ) {}

  async getCommentLists(
    mentorIntra: string,
    paginationDto: PaginationDto,
  ): Promise<[Comments[], number]> {
    try {
      /*
       * findAndCountはクエリが２回でる
       * データの取得（SELECT クエリ）
       * 全体の件数の取得（COUNT クエリ）
       * SELECT DISTINCTがある場合　もう１回して３回
       */
      const comment: [Comments[], number] =
        await this.commentsRepository.findAndCount({
          relations: { cadets: true },
          select: {
            id: true,
            content: true,
            cadets: { intraId: true, profileImage: true },
            createdAt: true,
          },
          where: {
            isDeleted: false,
            mentors: { intraId: mentorIntra },
          },
          take: paginationDto.take,
          skip: paginationDto.take * (paginationDto.page - 1),
          order: { createdAt: 'DESC' },
        });

      return comment;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }

  async saveComment(comment: Comments): Promise<boolean> {
    // クエリが１回出る場合：サービスのcreateCommentに呼び出された時保存１回　→ 新しく生成したこと
    // クエリが2 回出る場合：サービズのupdateCommentに呼び出された時オブジェクト確認、保存つづ２回　→ 既存持っていたデータ
    try {
      await this.commentsRepository.save(comment);
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SAVE);
    }

    return true;
  }

  async findCommentById(commentId: string): Promise<Comments> {
    let comment: Comments;
    try {
      comment = await this.commentsRepository.findOne({
        where: { id: commentId },
        relations: { cadets: true },
        select: { cadets: { intraId: true } },
      });
    } catch {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!comment) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return comment;
  }
}
