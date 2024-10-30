import { setSeederFactory } from 'typeorm-extension';
import { fakerJA } from '@faker-js/faker';
import { REPORT_STATUS, Reports } from '../../entity/reports.entity';

export const ReportsFactory = setSeederFactory(Reports, (faker) => {
  const reports = new Reports();

  reports.place = faker.helpers.arrayElement(['on-line', 'off-line']);
  reports.topic = fakerJA.word.noun(50);
  reports.content = fakerJA.word.noun(1000);
  reports.money = faker.number.int({ min: 0, max: 3 }) * 5000;
  reports.status = REPORT_STATUS.DONE;
  reports.imageUrl = [
    '/assets/images/de6dfeaa61a495e324fafb1d906ac1e8.jpg',
    '/assets/images/de6dfeaa61a495e324fafb1d906ac1e8.jpg',
  ];
  reports.signatureUrl = '/assets/images/9e4c21af66406b193c308eb706bbf3910.png';
  reports.extraCadets = '';
  reports.feedbackMessage = fakerJA.lorem.paragraph(3);
  reports.feedback1 = faker.number.int({ min: 1, max: 5 });
  reports.feedback2 = faker.number.int({ min: 1, max: 5 });
  reports.feedback3 = faker.number.int({ min: 1, max: 5 });

  return reports;
});
