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

    mentoringLogs.cadets =
      meta.cadetsMeta[faker.number.int(meta.cadetsMeta.length - 1)];

    mentoringLogs.mentors =
      meta.mentorsMeta[faker.number.int(meta.mentorsMeta.length - 1)];

    mentoringLogs.topic = fakerJA.lorem.sentence(4);

    mentoringLogs.content = fakerJA.lorem.text();

    mentoringLogs.status = faker.helpers.enumValue(LOG_STATUS);

    //ステータスによってお出会いする時間設定する
    if (mentoringLogs.status != LOG_STATUS.WATING) {
      mentoringLogs.meetingAt = [
        faker.date.soon(),
        faker.date.soon({ days: 10 }),
      ];
    }

    //ステータスによってrejectMessage設定する
    if (mentoringLogs.status == LOG_STATUS.CANCEL) {
      mentoringLogs.rejectMessage = fakerJA.lorem.paragraph(2);
    }

    mentoringLogs.requestTime1 = [
      faker.date.soon(),
      faker.date.soon({ days: 2 }),
    ];

    mentoringLogs.requestTime2 = faker.datatype.boolean()
      ? [faker.date.soon(), faker.date.soon({ days: 3 })]
      : null;

    mentoringLogs.requestTime3 =
      mentoringLogs.requestTime2 && faker.datatype.boolean()
        ? [faker.date.soon(), faker.date.soon({ days: 4 })]
        : null;

    return mentoringLogs;
  },
);
