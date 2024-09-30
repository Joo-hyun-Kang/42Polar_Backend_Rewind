import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MentorsService } from '../mentors/mentors.service';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';
import { MentoringLogsService } from '../mentoring-logs/mentoring-logs.service';
import {
  LOG_STATUS,
  MentoringLogs,
} from 'src/domain/typeorm/entity/mentoring-logs.entity';

@Injectable()
export class CalendarService {
  constructor(
    @Inject(forwardRef(() => MentorsService))
    private readonly mentorsService: MentorsService,
    @Inject(forwardRef(() => MentoringLogsService))
    private readonly mentoringLogsService: MentoringLogsService,
  ) {}

  async getAvailableTimes(mentorIntraId: string) {
    const mentor: Mentors = await this.mentorsService.findByIntra(
      mentorIntraId,
    );

    return JSON.parse(mentor.availableTime);
  }

  async getReservedTimes(mentorIntraId: string): Promise<Date[][]> {
    const waitingAndApprovedMentorings =
      await this.mentoringLogsService.getMentoringListByStatus(mentorIntraId, [
        LOG_STATUS.WATING,
        LOG_STATUS.CONFIRMED,
      ]);

    if (!waitingAndApprovedMentorings) {
      throw new NotFoundException(process.env.NOTFOUNDEXECEPTION);
    }

    return await this.makeRequestTimesArray(waitingAndApprovedMentorings);
  }

  async makeRequestTimesArray(
    mentoringLogs: MentoringLogs[],
  ): Promise<Date[][]> {
    const result = [];
    mentoringLogs.forEach((element) => {
      if (element.status == LOG_STATUS.CONFIRMED) {
        result.push(element.meetingAt);
      } else {
        result.push(element.requestTime1);
        if (element.requestTime2) result.push(element.requestTime2);
        if (element.requestTime3) result.push(element.requestTime3);
      }
    });
    return result;
  }

  async filterDate(requestTimes: Date[][], date: string): Promise<Date[][]> {
    //dateパラメータの形:mentorIntraId?date="2024-08"
    if (!date) {
      return requestTimes;
    }

    //もしかして、配列にヌルがある場合は確定なのに、MeetingAtが設定していないようにデータが崩れている場合
    const result: Date[][] = await Promise.all(
      requestTimes.map(async (time: Date[]) => {
        const timeDate = `${time[0].getFullYear()}-${(time[0].getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;
        if (timeDate === date) {
          return time;
        }
      }),
    );

    return result.filter(Boolean);
  }
}
