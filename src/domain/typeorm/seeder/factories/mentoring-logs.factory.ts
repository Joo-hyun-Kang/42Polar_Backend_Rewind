import { setSeederFactory } from 'typeorm-extension';
import { Mentors } from '../../entity/mentors.entity';
import { Cadets } from '../../entity/cadets.entity';
import { LOG_STATUS, MentoringLogs } from '../../entity/mentoring-logs.entity';
import { faker, fakerJA } from '@faker-js/faker';

interface mentoringLogsFactoryMeta {
  cadetsMeta: Cadets[];
  mentorsMeta: Mentors[];
}

function generateMentoringTimes(createdTime: Date): Date[] {
  //ランダムで生成時間から１が月から3ヶ月まで足します
  const afterCreateMonth =
    faker.number.int({
      min: 0,
      max: 3,
    }) *
    30 *
    24 *
    60 *
    60 *
    1000;

  //ランダムで生成時間から１時間から６時間まで足します
  const afterCreateTime =
    faker.number.int({
      min: 1,
      max: 20,
    }) *
    60 *
    60 *
    1000;

  const generatedRequestTime1 = new Date(
    createdTime.getTime() + afterCreateMonth + afterCreateTime,
  );

  //現在メンターリングは００分、３０分に限られています
  generatedRequestTime1.setMinutes(faker.datatype.boolean() ? 0 : 30);
  generatedRequestTime1.setSeconds(0);
  generatedRequestTime1.setMilliseconds(0);

  //ランダムで始まり時間から１時間から４時間まで足します
  const mentoringTime =
    faker.number.int({
      min: 1,
      max: 4,
    }) *
    60 *
    60 *
    1000;

  const generatedRequestTime2 = new Date(
    generatedRequestTime1.getTime() + mentoringTime,
  );

  return [generatedRequestTime1, generatedRequestTime2];
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

    // createdAt: 2ヶ月前から今日までのランダムな日付を生成
    mentoringLogs.createdAt = faker.date.between({
      from: subMonths(new Date(), 3), // 今日から2ヶ月前
      to: new Date(), // 今日
    });

    // requestTime1: 今日基準で、3ヶ月前から2ヶ月後まで

    mentoringLogs.requestTime1 = generateMentoringTimes(
      mentoringLogs.createdAt,
    );

    // requestTime2: 50%の確率で設定する、同様に日付を生成
    if (faker.datatype.boolean()) {
      mentoringLogs.requestTime2 = generateMentoringTimes(
        mentoringLogs.createdAt,
      );
    } else {
      mentoringLogs.requestTime2 = null;
    }

    // requestTime3: requestTime2が存在し、50%の確率で設定する
    if (mentoringLogs.requestTime2 && faker.datatype.boolean()) {
      mentoringLogs.requestTime3 = generateMentoringTimes(
        mentoringLogs.createdAt,
      );
    } else {
      mentoringLogs.requestTime3 = null;
    }

    // meetingAt: ステータスが WATING 以外の場合、ミーティング時間を設定
    if (
      mentoringLogs.status !== LOG_STATUS.WATING &&
      mentoringLogs.status !== LOG_STATUS.DONE
    ) {
      mentoringLogs.meetingAt = mentoringLogs.requestTime1;
      mentoringLogs.meetingStart = mentoringLogs.requestTime1[0];
    }

    // メンタリングステイタスによる、meetingAt設定修正
    const now = new Date();
    if (mentoringLogs.status == LOG_STATUS.WATING) {
      if (mentoringLogs.requestTime1[0] < now) {
        mentoringLogs.status = LOG_STATUS.DONE;
        mentoringLogs.meetingAt = mentoringLogs.requestTime1;
        mentoringLogs.meetingStart = mentoringLogs.requestTime1[0];
      }
    } else if (mentoringLogs.status == LOG_STATUS.DONE) {
      if (mentoringLogs.requestTime1[0] > now) {
        mentoringLogs.status = LOG_STATUS.WATING;
      } else {
        mentoringLogs.meetingAt = mentoringLogs.requestTime1;
        mentoringLogs.meetingStart = mentoringLogs.requestTime1[0];
      }
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
