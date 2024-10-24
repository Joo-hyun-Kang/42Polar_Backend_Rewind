import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  REPORT_STATUS,
  Reports,
} from 'src/domain/typeorm/entity/reports.entity';
import { QueryRunner, Repository } from 'typeorm';

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
          cadets: true,
          mentors: true,
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

  /*
   * 他のエンティティと連関関係はアップデートしていない
   */
  async updateReportByQueryRunner(
    report: Reports,
    queryRunner: QueryRunner,
  ): Promise<boolean> {
    try {
      await queryRunner.manager
        .createQueryBuilder()
        .update(Reports)
        .set({
          extraCadets: report.extraCadets,
          place: report.place,
          topic: report.topic,
          content: report.content,
          imageUrl: report.imageUrl,
          signatureUrl: report.signatureUrl,
          feedbackMessage: report.feedbackMessage,
          feedback1: report.feedback1,
          feedback2: report.feedback2,
          feedback3: report.feedback3,
          money: report.money,
          status: report.status,
        })
        .where('id = :id', { id: report.id })
        .execute();

      return true;
    } catch (error) {
      console.error(error);
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SAVE);
    }
  }

  async getCompletedReportsByMentor(mentorId: string) {
    let CompletedReports: Reports[];
    try {
      CompletedReports = await this.reportRepository.find({
        relations: { mentoringLogs: true },
        where: { mentors: { id: mentorId }, status: REPORT_STATUS.DONE },
      });
    } catch {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    return CompletedReports;
  }
}
