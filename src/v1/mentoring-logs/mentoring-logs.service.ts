import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
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
import { UpdateMentoringLogInfo } from './interface/change-status.interface';
import { getJSTDate } from '../util/utils';

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
  ): Promise<MentoringLogs> {
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

  async updateMentoringLogStatus(
    infos: UpdateMentoringLogInfo,
  ): Promise<boolean> {
    //なければ,NotFoundExceptionが発生する
    const logs: MentoringLogs = await this.findMentoringLogsById(
      infos.mentoringLogId,
    );

    //更新するユーザーの権限があるか検証
    await this.validateUser(infos.MentorOrCadetId, infos.status, logs);

    //アップデートするステータスについて検証
    this.validateStatus(logs.status, infos.status);

    logs.status = infos.status;
    if (infos.status === LOG_STATUS.CANCEL) {
      logs.rejectMessage = infos.rejectMessage;
      logs.meetingAt = [];
    } else if (infos.status === LOG_STATUS.CONFIRMED) {
      const requestedTime = this.getRequestTimeOrNull(
        logs,
        infos.meetingAtIndex,
      );

      if (!requestedTime) {
        throw new BadRequestException(process.env.BADREQUESTEXCEPTION);
      }

      //選ばれたリクエストタイムのメンタリング時間ルールに合うか検証
      this.applyService.checkDate(
        getJSTDate(requestedTime[0]),
        getJSTDate(requestedTime[1]),
      );

      //現在より過去の時間検証
      this.applyService.isMentoringOver([
        getJSTDate(requestedTime[0]),
        getJSTDate(requestedTime[1]),
      ]);

      logs.meetingAt = requestedTime;
      logs.meetingStart = requestedTime[0];
    } else if (infos.status === LOG_STATUS.DONE) {
      if (!this.isValidTimeForMakeDone(logs)) {
        throw new BadRequestException(
          'メンタリング開始時間から30分後にメンタリングを完了することができます。',
        );
      }
    } else {
      throw new BadRequestException(process.env.BADREQUESTEXCEPTION);
    }

    await this.mentoringLogsRepository.save(logs);

    return true;
  }

  async findMentoringLogsById(uuid: string): Promise<MentoringLogs> {
    //なければ,NotFoundExceptionが発生する
    const logs: MentoringLogs =
      await this.mentoringLogsRepository.findMentoringLogsById(uuid);

    return logs;
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

  async validateUser(
    mentorOrCadetId: string,
    updateStatus: LOG_STATUS,
    foundLog: MentoringLogs,
  ): Promise<boolean> {
    const mentor = await foundLog.mentors;
    const cadet = await foundLog.cadets;

    if (!mentor || !cadet) {
      throw new BadRequestException('正しくないメンタリング型です。');
    }
    if (updateStatus === LOG_STATUS.CANCEL) {
      if (
        mentorOrCadetId !== mentor.intraId &&
        mentorOrCadetId !== cadet.intraId
      ) {
        throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
      }
    } else {
      if (mentorOrCadetId !== mentor.intraId) {
        {
          throw new UnauthorizedException(process.env.UNAUTHORIZEDEXCEPTION);
        }
      }
    }

    return true;
  }

  validateStatus(currentStatus: string, updateStatus: LOG_STATUS): void {
    switch (updateStatus) {
      case LOG_STATUS.CONFIRMED:
        if (currentStatus !== LOG_STATUS.WATING) {
          throw new BadRequestException(
            'お待ち中のメンタリングだけ、変更ができます。',
          );
        }
        break;
      case LOG_STATUS.CANCEL:
        if (
          currentStatus !== LOG_STATUS.WATING &&
          currentStatus !== LOG_STATUS.CONFIRMED
        ) {
          throw new BadRequestException(
            'お待ち中と確定のメンタリングだけ取り消すことができます。',
          );
        }
        break;
      case LOG_STATUS.DONE:
        if (currentStatus !== LOG_STATUS.CONFIRMED) {
          throw new BadRequestException(
            '確定されているメンタリングだけを更新できます。',
          );
        }
        break;
      case LOG_STATUS.WATING:
        throw new BadRequestException(
          'メンタリングの状態をお待ち中に変更することはできません。',
        );
    }
  }

  getRequestTimeOrNull(logs: MentoringLogs, index: number): Date[] {
    switch (index) {
      case 0:
        return logs.requestTime1;
      case 1:
        return logs.requestTime2;
      case 2:
        return logs.requestTime3;
      default:
        return null;
    }
  }

  isValidTimeForMakeDone(log: MentoringLogs): boolean {
    const startMeetingAtIndex = 0;
    const DONE_LIMIT_MIN = 30;
    const now = new Date();
    now.setMinutes(now.getMinutes() - DONE_LIMIT_MIN);
    if (log.meetingAt[startMeetingAtIndex].getTime() > now.getTime()) {
      return false;
    }
    return true;
  }
}
