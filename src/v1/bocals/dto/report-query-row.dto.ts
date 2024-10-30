import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ReportQueryRowDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  take: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  page: number;

  @IsOptional()
  @IsString()
  isAscending: string;

  @IsOptional()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  mentorName: string;

  @IsOptional()
  @IsString()
  mentorIntra: string;

  @IsOptional()
  @IsString()
  status: string;
}
