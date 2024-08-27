import { setSeederFactory } from 'typeorm-extension';
import { fakerJA } from '@faker-js/faker';
import { REPORT_STATUS, Reports } from '../../entity/reports.entity';

export const ReportsFactory = setSeederFactory(Reports, faker => {
  const reports = new Reports();

  reports.place = faker.helpers.arrayElement(['on-line', 'off-line']);
  reports.topic = fakerJA.word.noun(50);
  reports.content = fakerJA.word.noun(1000);
  reports.money = faker.number.int({ min: 0, max: 10 }) * 50000;
  reports.status = REPORT_STATUS.DONE;
  reports.imageUrl = [faker.image.url(), faker.image.url()];
  reports.signatureUrl = faker.internet.url();
  reports.feedbackMessage = fakerJA.lorem.paragraph(3);
  reports.feedback1 = faker.number.int({ min: 1, max: 5 });
  reports.feedback2 = faker.number.int({ min: 1, max: 5 });
  reports.feedback3 = faker.number.int({ min: 1, max: 5 });

  return reports;
});
