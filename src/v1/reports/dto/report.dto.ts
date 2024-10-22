import { MentoringLogs } from 'src/domain/typeorm/entity/mentoring-logs.entity';

export class ReportDto {
  id: string;
  mentors: { name: string };
  cadets: { name: string; isCommon: boolean; intraId: string };
  extraCadets: string;
  place: string;
  topic: string;
  content: string;
  imageUrl: string[];
  signatureUrl: string;
  feedbackMessage: string;
  feedback1: number;
  feedback2: number;
  feedback3: number;
  money: number;
  status: string;
  mentoringLogs: MentoringLogs;
  updatedAt: Date;
  createdAt: Date;
}
