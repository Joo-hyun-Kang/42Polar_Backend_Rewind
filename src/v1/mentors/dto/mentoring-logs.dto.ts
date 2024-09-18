export class MentoringLogsDto {
  id: string;
  createdAt: Date;
  meetingAt: Date[];
  cadet: {
    name: string;
    intraId: string;
    resumeUrl: string;
    isCommon: boolean;
  };
  topic: string;
  status: string;
  report: {
    id: string;
    status: string;
  };
  meta: {
    requestTime: Date[][];
    rejectMessage: string;
    content: string;
  };
}
