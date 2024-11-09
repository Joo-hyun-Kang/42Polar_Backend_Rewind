import { REPORT_STATUS } from 'src/domain/typeorm/entity/reports.entity';

export class ParsedReportQueryDto {
  take: number;
  page: number;
  isAscending?: boolean;
  startDate?: Date;
  endDate?: Date;
  mentorName?: string;
  mentorIntra?: string;
  status?: REPORT_STATUS;
}
