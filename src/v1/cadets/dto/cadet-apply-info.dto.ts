import { CadetMentoringLogs } from './cadet-mentoring-logs.interface';

export class CadetApplyInfoDto {
  username: string;
  resumeUrl: string;
  mentorings: CadetMentoringLogs[];
}
