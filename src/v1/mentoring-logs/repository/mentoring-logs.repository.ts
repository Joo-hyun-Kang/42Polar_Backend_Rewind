import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LOG_STATUS,
  MentoringLogs,
} from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { PaginationDto } from 'src/v1/dto/pagination.dto';
import { SimpleLogDto } from 'src/v1/mentors/dto/simple-log.dto';
import { In, Repository } from 'typeorm';

@Injectable()
export class MentoringLogsRepository {
  constructor(
    @InjectRepository(MentoringLogs)
    private mentoringLogsRepository: Repository<MentoringLogs>,
  ) {}

  async getSimpeLogs(mentorIntraId: string, paginationDto: PaginationDto) {
    try {
      const simpleLogs: [SimpleLogDto[], number] =
        await this.mentoringLogsRepository.findAndCount({
          select: {
            id: true,
            createdAt: true,
            meetingAt: true,
            topic: true,
            status: true,
            meetingStart: true,
          },
          where: {
            mentors: { intraId: mentorIntraId },
            status: LOG_STATUS.DONE,
          },
          take: paginationDto.take,
          skip: paginationDto.take * (paginationDto.page - 1),
          order: { meetingAt: 'DESC' },
        });

      return simpleLogs;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }

  async getMentoringsLists(intraId: string, pagination: PaginationDto) {
    try {
      /*
       * findAndCountはクエリが２回でる
       * データの取得（SELECT クエリ）
       * 全体の件数の取得（COUNT クエリ）
       */
      const result = await this.mentoringLogsRepository.findAndCount({
        relations: { cadets: true, reports: true },
        where: {
          mentors: { intraId },
        },
        take: pagination.take,
        skip: pagination.take * (pagination.page - 1),
        order: { createdAt: 'DESC' },
      });

      return result;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }

  async getMentoringListByStatus(
    mentorIntraId: string,
    mentoringStatus: LOG_STATUS[],
  ) {
    try {
      const found: MentoringLogs[] = await this.mentoringLogsRepository.find({
        where: {
          mentors: { intraId: mentorIntraId },
          status: In(mentoringStatus),
        },
      });
      return found;
    } catch {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }

  async save(mentoringLogs: MentoringLogs): Promise<boolean> {
    try {
      await this.mentoringLogsRepository.save(mentoringLogs);
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SAVE);
    }

    return true;
  }
}
