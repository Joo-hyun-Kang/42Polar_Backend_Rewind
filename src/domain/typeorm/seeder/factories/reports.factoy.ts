import { setSeederFactory } from 'typeorm-extension';
import { fakerJA } from '@faker-js/faker';
import { REPORT_STATUS, Reports } from '../../entity/reports.entity';

export const ReportsFactory = setSeederFactory(Reports, (faker) => {
  const reports = new Reports();

  reports.place = faker.helpers.arrayElement(['on-line', 'off-line']);
  reports.topic = fakerJA.lorem.sentence();
  reports.content = fakerJA.lorem.paragraph(2);
  reports.status = REPORT_STATUS.DONE;
  reports.imageUrl = [
    '/assets/images/report1.png',
    '/assets/images/report2.png',
  ];
  reports.signatureUrl = '/assets/images/signature.png';
  reports.extraCadets = '';
  reports.feedbackMessage = fakerJA.lorem.paragraph(3);
  reports.feedback1 = faker.number.int({ min: 1, max: 5 });
  reports.feedback2 = faker.number.int({ min: 1, max: 5 });
  reports.feedback3 = faker.number.int({ min: 1, max: 5 });

  return reports;
});
