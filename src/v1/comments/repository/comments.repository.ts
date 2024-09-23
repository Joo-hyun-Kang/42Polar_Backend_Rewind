import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/domain/typeorm/entity/comments.entity';
import { PaginationDto } from 'src/v1/dto/pagination.dto';
import { Repository } from 'typeorm';

@Injectable()
export class commentsRepository {
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
      //   throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
      throw error;
    }
  }
}
