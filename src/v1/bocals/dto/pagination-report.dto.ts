import { Cadets } from 'src/domain/typeorm/entity/cadets.entity';
import { MentoringLogs } from 'src/domain/typeorm/entity/mentoring-logs.entity';
import { Mentors } from 'src/domain/typeorm/entity/mentors.entity';

export class PaginationReportDto {
  reports: ReportResolved[];
  total: number;
}

/*
 * ReportsエンティティのクラスでPromiseを除く
 * プロントからPromise処理していない（DBには遅延ローディンため, Promise使用）
 */
export class ReportResolved {
  id: string;
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
  mentors: Mentors;
  cadets: Cadets;
}
