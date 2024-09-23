import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AvailableTimeDto } from './available-time.dto';

export class JoinMentorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slackId: string;

  @IsOptional()
  availableTime?: AvailableTimeDto[][];

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  duty: string;
}
