import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplyDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Date)
  @IsNotEmpty()
  @IsOptional({ each: true })
  requestTime1: Date[];

  @IsOptional()
  @Type(() => Date)
  @IsNotEmpty({ each: true })
  requestTime2: Date[];

  @IsOptional()
  @Type(() => Date)
  @IsNotEmpty({ each: true })
  requestTime3: Date[];
}
