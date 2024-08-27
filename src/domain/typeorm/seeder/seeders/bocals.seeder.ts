import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Bocals } from '../../entity/bocal.entity';

export class BocalsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const bocalsFactory = factoryManager.get(Bocals);
    await bocalsFactory.saveMany(3);
  }
}
