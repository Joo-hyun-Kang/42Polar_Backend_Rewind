import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Team } from '../../entity/team.entity';

export default class TeamsSeeder implements Seeder {
  public async run(
    database: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const teamsFactory = factoryManager.get(Team);
    await teamsFactory.saveMany(5);
  }
}
