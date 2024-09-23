import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { SimpleLogDto } from '../mentors/dto/simple-log.dto';
import { MentoringLogsRepository } from './repository/mentoring-logs.repository';
import { MentoringInfoDto } from '../mentors/dto/mentoring-info.dto';
import { MentoringLogsDto } from '../mentors/dto/mentoring-logs.dto';
import { MentoringLogs } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { Reports } from 'src/domain/typeorm/entity/reports.entity';

@Injectable()
export class MentoringLogsService {
  constructor(private mentoringLogsRepository: MentoringLogsRepository) {}

  async getSimpleLogsPagination(
    mentorIntraId: string,
    paginationDto: PaginationDto,
  ): Promise<[SimpleLogDto[], number]> {
    return await this.mentoringLogsRepository.getSimpeLogs(
      mentorIntraId,
      paginationDto,
    );
  }

  async getMentoringsLists(
    intraId: string,
    pagination: PaginationDto,
  ): Promise<MentoringInfoDto> {
    const result: [MentoringLogs[], number] =
      await this.mentoringLogsRepository.getMentoringsLists(
        intraId,
        pagination,
      );

    const MENTORING_LOG_INDEX = 0;
    const MENTORING_COUNT_INDEX = 1;

    const logs: MentoringLogsDto[] = await Promise.all(
      result[MENTORING_LOG_INDEX].map(async (log) => {
        const cadet = await log.cadets;
        const report = await log.reports;
        return this.formatMentoringLog(log, cadet, report);
      }),
    );

    return { logs, total: result[MENTORING_COUNT_INDEX] };
  }

  formatMentoringLog(
    log: MentoringLogs,
    cadet: Cadets,
    reports: Reports,
  ): MentoringLogsDto {
    return {
      id: log.id,
      createdAt: log.createdAt,
      meetingAt: log.meetingAt,
      cadet: {
        name: cadet.name,
        intraId: cadet.intraId,
        resumeUrl: cadet.resumeUrl,
        isCommon: cadet.isCommon,
      },
      topic: log.topic,
      status: log.status,
      report: {
        id: reports ? reports.id : null,
        status: reports ? reports.status : null,
      },
      meta: {
        requestTime: [log.requestTime1, log.requestTime2, log.requestTime3],
        rejectMessage: log.rejectMessage,
        content: log.content,
      },
    };
  }
}
