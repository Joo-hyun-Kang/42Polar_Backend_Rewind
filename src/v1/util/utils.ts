import { BadRequestException } from '@nestjs/common';

export const getJSTDate = (utc: Date): Date => {
  const JP_TIME_DIFF = 9 * 60 * 60 * 1000;
  const JST = new Date(utc.getTime() + JP_TIME_DIFF);
  return JST;
};

export const getTotalHour = (times: Date[]): number => {
  const hour = 1000 * 60 * 60;
  return (times[1].getTime() - times[0].getTime()) / hour;
};

export const toDate = (value: any): Date => {
  if (value instanceof Date && !isNaN(value.getTime())) {
    return value;
  }

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    throw new BadRequestException('正しいDate型がありません。');
  }

  return date;
};

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}
