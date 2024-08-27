import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { MentoringLogs } from '../../entity/mentoring-logs.entity';
import { Mentors } from '../../entity/mentors.entity';
import { Cadets } from '../../entity/cadets.entity';

export class MentoringLogsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    console.log('Seeding mentoring-logs...');
    const mentorRepository = dataSource.getRepository(Mentors);
    const cadetRepository = dataSource.getRepository(Cadets);

    const mentoringLogsFactory = await factoryManager.get(MentoringLogs);
    const cadetsMeta = await cadetRepository.find();
    const mentorsMeta = await mentorRepository.find();
    await mentoringLogsFactory.setMeta({ cadetsMeta, mentorsMeta });
    await mentoringLogsFactory.saveMany(100);
  }
}
