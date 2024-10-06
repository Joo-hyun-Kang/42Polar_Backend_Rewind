import { IsNotEmpty, IsUUID } from 'class-validator';

export class CompleteMentoringDto {
  @IsUUID()
  @IsNotEmpty()
  mentoringLogId: string;
}
