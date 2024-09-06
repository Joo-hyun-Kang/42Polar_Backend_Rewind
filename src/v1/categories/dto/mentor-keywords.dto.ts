import { IsArray, IsOptional, IsString } from 'class-validator';

export class MentorKeywordsDto {
  @IsOptional()
  @IsArray()
  keywords?: string[];

  @IsOptional()
  @IsString()
  mentorName?: string;
}
