import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateApplyDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  //class-validatorが配列の文字列をDate型で切り替えることができないので、
  //直接に変換する関数、utilsファイルに実装して、利用中
  @Type(() => Date)
  @IsNotEmpty()
  @IsOptional({ each: true })
  requestTime1: Date[];

  //class-validatorが配列の文字列をDate型で切り替えることができないので、
  //直接に変換する関数、utilsファイルに実装して、利用中
  @IsOptional()
  @Type(() => Date)
  @IsNotEmpty({ each: true })
  requestTime2: Date[];

  //class-validatorが配列の文字列をDate型で切り替えることができないので、
  //直接に変換する関数、utilsファイルに実装して、利用中
  @IsOptional()
  @Type(() => Date)
  @IsNotEmpty({ each: true })
  requestTime3: Date[];
}
