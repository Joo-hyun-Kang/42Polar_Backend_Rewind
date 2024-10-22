import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from 'src/domain/typeorm/entity/reports.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsRepository {
  constructor(
    @InjectRepository(Reports)
    private readonly reportRepository: Repository<Reports>,
  ) {}

  async save(report: Reports): Promise<Reports> {
    let result = null;

    try {
      result = await this.reportRepository.save(report);
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SAVE);
    }

    return result;
  }

  async findReportById(reportId: string): Promise<Reports> {
    let report: Reports;
    try {
      report = await this.reportRepository.findOne({
        where: { id: reportId },
        relations: {
          cadets: true,
          mentors: true,
          mentoringLogs: true,
        },
        select: {
          cadets: { name: true, isCommon: true, intraId: true },
          mentors: { name: true },
        },
      });
    } catch {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!report) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return report;
  }
}
