import { LOG_STATUS } from 'src/domain/typeorm/entity/mentoring-logs.entity';

export interface UpdateMentoringLogInfo {
  MentorOrCadetId: string;
  mentoringLogId: string;
  status: LOG_STATUS;
  meetingAtIndex?: number;
  rejectMessage?: string;
}
