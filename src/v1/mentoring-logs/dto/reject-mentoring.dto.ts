import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RejectMentoringDto {
  @IsUUID()
  @IsNotEmpty()
  mentoringLogId: string;

  @IsString()
  @IsNotEmpty()
  rejectMessage: string;
}
