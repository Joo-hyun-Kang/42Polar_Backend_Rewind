import { setSeederFactory } from 'typeorm-extension';
import { Mentors } from '../../entity/mentors.entity';
import { Cadets } from '../../entity/cadets.entity';
import { LOG_STATUS, MentoringLogs } from '../../entity/mentoring-logs.entity';
import { fakerJA } from '@faker-js/faker';

interface mentoringLogsFactoryMeta {
  cadetsMeta: Cadets[];
  mentorsMeta: Mentors[];
}

export const MentoringLogsFactory = setSeederFactory(
  MentoringLogs,
  (faker, meta: mentoringLogsFactoryMeta) => {
    const mentoringLogs = new MentoringLogs();

    mentoringLogs.cadets = Promise.resolve(
      meta.cadetsMeta[faker.number.int(meta.cadetsMeta.length - 1)],
    );

    mentoringLogs.mentors = Promise.resolve(
      meta.mentorsMeta[faker.number.int(meta.mentorsMeta.length - 1)],
    );

    mentoringLogs.topic = fakerJA.lorem.sentence(4);

    mentoringLogs.content = fakerJA.lorem.text();

    mentoringLogs.status = faker.helpers.enumValue(LOG_STATUS);

    // createdAt: 3ヶ月前から今日までのランダムな日付を生成
    mentoringLogs.createdAt = faker.date.between({
      from: subMonths(new Date(), 3), // 今日から3ヶ月前
      to: new Date(), // 今日
    });

    // requestTime1: 今日基準で、3ヶ月前から2ヶ月後まで
    mentoringLogs.requestTime1 = [
      faker.date.between({
        from: subMonths(new Date(), 3), // 3ヶ月前
        to: addMonths(new Date(), 2), // 2ヶ月後
      }),
      faker.date.between({
        from: subMonths(new Date(), 3), // 3ヶ月前
        to: addMonths(new Date(), 2), // 2ヶ月後
      }),
    ];

    // requestTime2: 50%の確率で設定する、同様に日付を生成
    mentoringLogs.requestTime2 = faker.datatype.boolean()
      ? [
          faker.date.between({
            from: subMonths(new Date(), 3),
            to: addMonths(new Date(), 2),
          }),
          faker.date.between({
            from: subMonths(new Date(), 3),
            to: addMonths(new Date(), 2),
          }),
        ]
      : null;

    // requestTime3: requestTime2が存在し、50%の確率で設定する
    mentoringLogs.requestTime3 =
      mentoringLogs.requestTime2 && faker.datatype.boolean()
        ? [
            faker.date.between({
              from: subMonths(new Date(), 3),
              to: addMonths(new Date(), 2),
            }),
            faker.date.between({
              from: subMonths(new Date(), 3),
              to: addMonths(new Date(), 2),
            }),
          ]
        : null;

    // meetingAt: ステータスが WATING 以外の場合、ミーティング時間を設定
    if (mentoringLogs.status !== LOG_STATUS.WATING) {
      mentoringLogs.meetingAt = mentoringLogs.requestTime1;
    }

    //ステータスによってrejectMessage設定する
    if (mentoringLogs.status == LOG_STATUS.CANCEL) {
      mentoringLogs.rejectMessage = fakerJA.lorem.paragraph(2);
    }

    return mentoringLogs;
  },
);

function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

function subMonths(date: Date, months: number): Date {
  return addMonths(date, -months);
}
