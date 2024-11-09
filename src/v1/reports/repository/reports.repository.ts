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
import { ParsedReportQueryDto } from 'src/v1/bocals/dto/parsed-report-query.dto';
import { Between, In, QueryRunner, Repository } from 'typeorm';

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

  async findAndCountReports(
    pagination: ParsedReportQueryDto,
  ): Promise<[Reports[], number]> {
    try {
      return await this.reportRepository.findAndCount({
        where: [
          {
            mentors: {
              intraId: pagination.mentorIntra,
              name: pagination.mentorName,
            },
            mentoringLogs: {
              meetingStart: Between(pagination.startDate, pagination.endDate),
            },
            status: In([REPORT_STATUS.FIXING, REPORT_STATUS.DONE]),
          },
        ],
        relations: {
          mentoringLogs: true,
          cadets: true,
          mentors: true,
        },
        select: {
          id: true,
          extraCadets: true,
          place: true,
          createdAt: true,
          updatedAt: true,
          signatureUrl: true,
          imageUrl: true,
          money: true,
          status: true,
          mentoringLogs: {
            id: true,
            createdAt: true,
            meetingAt: true,
          },
          mentors: {
            intraId: true,
            name: true,
            duty: true,
          },
          cadets: {
            intraId: true,
            isCommon: true,
          },
        },
        order: {
          mentoringLogs: {
            meetingAt: pagination.isAscending ? 'ASC' : 'DESC',
          },
        },
        skip: pagination.take * (pagination.page - 1),
        take: pagination.take,
      });
    } catch (e) {
      console.error(e);
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }
  }

  async updateReportStatusToEdit(reportIdArray: string[]): Promise<boolean> {
    try {
      await this.reportRepository.update(
        { id: In(reportIdArray) },
        { status: REPORT_STATUS.FIXING },
      );
      return true;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_UPDATE);
    }
  }

  async updateReportStatusToDone(reportIdArray: string[]): Promise<boolean> {
    try {
      await this.reportRepository.update(
        { id: In(reportIdArray) },
        { status: REPORT_STATUS.DONE },
      );
      return true;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_UPDATE);
    }
  }

  async updateAllReportStatusToEdit(): Promise<boolean> {
    try {
      await this.reportRepository.update(
        { status: REPORT_STATUS.DONE },
        { status: REPORT_STATUS.FIXING },
      );
      return true;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_UPDATE);
    }
  }

  async updateAllReportStatusToDone(): Promise<boolean> {
    try {
      await this.reportRepository.update(
        { status: REPORT_STATUS.FIXING },
        { status: REPORT_STATUS.DONE },
      );
      return true;
    } catch (error) {
      throw new ConflictException(process.env.CONFLICTEXCEPTION_UPDATE);
    }
  }

  async findSelectedReports(reportIds: string[]): Promise<Reports[]> {
    let reports;

    try {
      reports = await this.reportRepository.find({
        where: [
          {
            id: In(reportIds),
          },
        ],
        relations: {
          mentoringLogs: true,
          cadets: true,
          mentors: true,
        },
        order: {
          mentoringLogs: {
            meetingAt: 'DESC',
          },
        },
      });
    } catch (e) {
      console.error(e);
      throw new ConflictException(process.env.CONFLICTEXCEPTION_SEARCH);
    }

    if (!reports) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return reports;
  }
}
