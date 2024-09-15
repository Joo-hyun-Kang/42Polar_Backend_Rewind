import { IsNotEmpty, IsNumber } from 'class-validator';

export class AvailableTimeDto {
  @IsNumber()
  @IsNotEmpty()
  startHour: number;

  @IsNumber()
  @IsNotEmpty()
  startMinute: number;

  @IsNumber()
  @IsNotEmpty()
  endHour: number;

  @IsNumber()
  @IsNotEmpty()
  endMinute: number;
}
