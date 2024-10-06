import { IsNotEmpty, IsNumber, IsUUID, Max, Min } from 'class-validator';

export class ApproveMentoringDto {
  @IsUUID()
  @IsNotEmpty()
  mentoringLogId: string;

  @IsNumber()
  @Min(0)
  @Max(2)
  meetingAtIndex: number;
}
