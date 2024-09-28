import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @Type(() => Number) // クエリパラメータを数値に変換
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  take: number;

  @Type(() => Number) // クエリパラメータを数値に変換
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  page: number;
}
