import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Comments } from '../../entity/comments.entity';
import { Mentors } from '../../entity/mentors.entity';
import { Cadets } from '../../entity/cadets.entity';

export class CommentsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const mentorRepository = dataSource.getRepository(Mentors);
    const cadetRepository = dataSource.getRepository(Cadets);

    const commentsFactory = factoryManager.get(Comments);
    const cadetsMeta = await cadetRepository.find();

    const mentorsMeta = await mentorRepository.find();

    commentsFactory.setMeta({ cadetsMeta, mentorsMeta });
    await commentsFactory.saveMany(5);
  }
}
