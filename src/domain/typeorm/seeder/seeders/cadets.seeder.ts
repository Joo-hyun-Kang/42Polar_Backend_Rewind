import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Cadets } from '../../entity/cadets.entity';

export class CadetsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const cadetsFactory = factoryManager.get(Cadets);
    await cadetsFactory.saveMany(10);
  }
}
