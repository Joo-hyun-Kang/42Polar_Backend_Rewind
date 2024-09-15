import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { SimpleLogDto } from '../mentors/dto/simple-log.dto';
import { MentoringLogsRepository } from './repository/mentoring-logs.repository';

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
}
