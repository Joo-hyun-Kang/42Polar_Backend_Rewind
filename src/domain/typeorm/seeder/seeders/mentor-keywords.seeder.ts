import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { mentorKeywordsData } from '../data/mentor-keywords-data';
import { Mentors } from '../../entity/mentors.entity';
import { Keywords } from '../../entity/keywords.entity';
import { MentorKeywords } from '../../entity/mentorKeywords.entity';

export class MentorKeywordsSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const mentorRepository = dataSource.getRepository(Mentors);
    const mentorKeywordRepository = dataSource.getRepository(MentorKeywords);
    const keywordRepository = dataSource.getRepository(Keywords);

    await Promise.all(
      mentorKeywordsData.map(async mentorKeyword => {
        const selectedMentor = await mentorRepository.findOne({
          select: { id: true },
          where: { name: mentorKeyword.mentor.name },
        });

        if (!selectedMentor) {
          console.error(`not found: ${selectedMentor}`);
          return;
        }

        await Promise.all(
          mentorKeyword.keywords.map(async keyword => {
            const selectedKeyword = await keywordRepository.findOne({
              select: { id: true },
              where: { name: keyword },
            });

            if (!selectedKeyword) {
              console.error(`not found: ${selectedMentor}`);
              return;
            }

            const newData = mentorKeywordRepository.create({
              mentors: selectedMentor,
              keywords: selectedKeyword,
            });

            return await mentorKeywordRepository.save(newData);
          }),
        );

        //
      }),
    );
  }
}
