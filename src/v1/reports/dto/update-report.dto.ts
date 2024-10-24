import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateReportDto {
  @IsString()
  @IsOptional()
  @Length(0, 500)
  extraCadets: string;

  @IsString()
  @IsOptional()
  @Length(0, 100)
  place: string;

  @IsString()
  @IsOptional()
  @Length(0, 150)
  topic: string;

  @IsString()
  @IsOptional()
  @Length(0, 5000)
  content: string;

  @IsString()
  @IsOptional()
  @Length(0, 3000)
  feedbackMessage: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  feedback1: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  feedback2: number;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(5)
  feedback3: number;

  @IsBoolean()
  @IsOptional()
  isDone: boolean;

  //class-validatorが配列の文字列をDate型で切り替えることができないので、
  //直接に変換する関数、utilsファイルに実装して、利用中
  @IsOptional({ each: true })
  @Type(() => Date)
  @IsNotEmpty({ each: true })
  meetingAt: Date[];
}
