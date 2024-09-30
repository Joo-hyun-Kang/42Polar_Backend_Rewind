import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PaginationDto } from '../dto/pagination.dto';
import { SimpleLogDto } from '../mentors/dto/simple-log.dto';
import { MentoringLogsRepository } from './repository/mentoring-logs.repository';
import { MentoringInfoDto } from '../mentors/dto/mentoring-info.dto';
import { MentoringLogsDto } from '../mentors/dto/mentoring-logs.dto';
import {
  LOG_STATUS,
  MentoringLogs,
} from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { Reports } from 'src/domain/typeorm/entity/reports.entity';
import { ApplyService } from './apply.service';
import { MentorsService } from '../mentors/mentors.service';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { CadetsService } from '../cadets/cadets.service';
import { CreateApplyDto } from './dto/create-apply.dto';

@Injectable()
export class MentoringLogsService {
  constructor(
    private readonly mentoringLogsRepository: MentoringLogsRepository,
    private readonly applyService: ApplyService,
    @Inject(forwardRef(() => MentorsService))
    private readonly mentorsService: MentorsService,
    private readonly cadetsService: CadetsService,
  ) {}

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

  async getMentoringListByStatus(
    mentorIntraId: string,
    mentoringStatus: LOG_STATUS[],
  ): Promise<MentoringLogs[]> {
    return await this.mentoringLogsRepository.getMentoringListByStatus(
      mentorIntraId,
      mentoringStatus,
    );
  }

  async createMentorigLog(
    mentorId: string,
    cadetId: string,
    createApplyDto: CreateApplyDto,
  ): Promise<boolean> {
    //Date型で切り替えていない場合、変更する, 例外が発生する
    this.validateDateFormate(createApplyDto);

    //過去にメンタリング申し込みの防止、例外が発生する
    this.applyService.validateRequestTime(createApplyDto);

    //メンターリングの正しいか、既に決まっているメンタリングの検証、例外が発生する
    await this.applyService.checkRequestTime(mentorId, createApplyDto);

    //当てはまるメンターがなければ例外
    const mentor: Mentors = await this.mentorsService.findByIntra(mentorId);
    if (!mentor.isActive) {
      throw new BadRequestException(
        'このメンターはメンターリング申し込みができません。',
      );
    }

    //当てはまる生徒がなければ例外
    const cadet: Cadets = await this.cadetsService.findCadetByIntraId(cadetId);

    const mentoringLogs = new MentoringLogs();
    mentoringLogs.cadets = Promise.resolve(cadet);
    mentoringLogs.mentors = Promise.resolve(mentor);
    mentoringLogs.topic = createApplyDto.topic;
    mentoringLogs.content = createApplyDto.content;
    mentoringLogs.requestTime1 = createApplyDto.requestTime1;
    mentoringLogs.requestTime2 = createApplyDto.requestTime2;
    mentoringLogs.requestTime3 = createApplyDto.requestTime3;
    mentoringLogs.status = LOG_STATUS.WATING;

    return await this.mentoringLogsRepository.save(mentoringLogs);
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

  validateDateFormate(createApplyDto: CreateApplyDto) {
    try {
      if (!(createApplyDto.requestTime1 instanceof Date)) {
        createApplyDto.requestTime1 = [
          this.toDate(createApplyDto.requestTime1[0]),
          this.toDate(createApplyDto.requestTime1[1]),
        ];
        if (
          createApplyDto.requestTime2 &&
          !(createApplyDto.requestTime2 instanceof Date)
        ) {
          createApplyDto.requestTime2 = [
            this.toDate(createApplyDto.requestTime2[0]),
            this.toDate(createApplyDto.requestTime2[1]),
          ];
          if (
            createApplyDto.requestTime3 &&
            !(createApplyDto.requestTime3 instanceof Date)
          ) {
            createApplyDto.requestTime3 = [
              this.toDate(createApplyDto.requestTime3[0]),
              this.toDate(createApplyDto.requestTime3[1]),
            ];
          }
        }
      }
    } catch (err) {
      console.error(err);
      throw new BadRequestException('候補時刻が正しいDate型がありません。');
    }
  }

  toDate(value: any): Date {
    if (value instanceof Date && !isNaN(value.getTime())) {
      return value;
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('候補時刻が正しいDate型がありません。');
    }

    return date;
  }
}
