export const getJSTDate = (utc: Date): Date => {
  const JP_TIME_DIFF = 9 * 60 * 60 * 1000;
  const JST = new Date(utc.getTime() + JP_TIME_DIFF);
  return JST;
};

export const getTotalHour = (times: Date[]): number => {
  const hour = 1000 * 60 * 60;
  return (times[1].getTime() - times[0].getTime()) / hour;
};
