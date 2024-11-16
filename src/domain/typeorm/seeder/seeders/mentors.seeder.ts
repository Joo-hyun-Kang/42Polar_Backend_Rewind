import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { mentorKeywordsData } from '../data/mentor-keywords-data';
import { Mentors } from '../../entity/mentors.entity';
import { fakerJA } from '@faker-js/faker';

export class MentorsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const mentorRepository = dataSource.getRepository(Mentors);
    console.log('Seeding mentors...');

    const mentors = await Promise.all(
      mentorKeywordsData.map(async (e) => {
        const mentor = new Mentors();
        const host = process.env.REACT_APP_API_URL || 'http://localhost:3001';

        mentor.intraId = e.mentor.intraId;
        mentor.name = e.mentor.name;
        //NestJSが性的ファイルをウェブサーバーとして伝えられるため、
        //いまいち、メンターはNestに写真アップロード中（AWSなどファイルシステムX)
        mentor.profileImage = host + e.mentor.profileImage;
        mentor.introduction = e.mentor.introduction;
        mentor.availableTime = e.mentor.availableTime;
        mentor.isActive = e.mentor.isActive;
        mentor.markdownContent = e.mentor.markdownContent;
        mentor.company = fakerJA.company.name();
        mentor.duty = fakerJA.company.buzzNoun();

        return mentor;
      }),
    );

    await mentorRepository.save(mentors);
  }
}
