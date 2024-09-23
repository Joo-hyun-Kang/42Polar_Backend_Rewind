import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { mentorKeywordsData } from '../data/mentor-keywords-data';
import { Mentors } from '../../entity/mentors.entity';
import { faker } from '@faker-js/faker';

export class MentorsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const mentorRepository = dataSource.getRepository(Mentors);
    console.log('Seeding mentors...');

    const mentors = await Promise.all(
      mentorKeywordsData.map(async (e) => {
        const mentor = new Mentors();

        mentor.intraId = e.mentor.intraId;
        mentor.name = e.mentor.name;
        mentor.profileImage = faker.image.avatar();
        mentor.introduction = e.mentor.introduction;
        mentor.availableTime = e.mentor.availableTime;
        mentor.isActive = e.mentor.isActive;
        mentor.markdownContent = e.mentor.markdownContent;

        return mentor;
      }),
    );

    await mentorRepository.save(mentors);
  }
}
