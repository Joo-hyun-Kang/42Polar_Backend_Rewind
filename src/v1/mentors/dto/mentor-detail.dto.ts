import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
import { AvailableTimeDto } from './available-time.dto';

export class UpdateMentorDatailDto {
  @IsOptional()
  availableTime?: AvailableTimeDto[][];

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  introduction?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  markdownContent?: string;

  @IsString()
  @IsOptional()
  slackId?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  duty?: string;
}
