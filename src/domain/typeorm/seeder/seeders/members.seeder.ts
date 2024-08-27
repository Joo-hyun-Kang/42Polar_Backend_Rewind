import { Member } from '../../../typeorm/entity/member.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Team } from '../../entity/team.entity';
import { faker } from '@faker-js/faker';

export default class MembersSeeder implements Seeder {
  public async run(
    database: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const teamsFactory = factoryManager.get(Team);
    const membersFactory = factoryManager.get(Member);

    const teams = await teamsFactory.saveMany(7);

    //Promise.all() to take advantage of node.js asynchronous abilities at the most and await for the result
    const members = await Promise.all(
      Array(17)
        .fill('')
        .map(async () => {
          // make(). That method does not save any records in the database,
          // it only generates an entity instance and it accepts custom properties as parameters
          const made = await membersFactory.make({
            //arrayElement from faker which returns a random elemen from a given array
            team: Promise.resolve(faker.helpers.arrayElement(teams)),
          });

          return made;
        }),
    );

    // データベースに保存する
    const membersRepository = database.getRepository(Member);
    await membersRepository.save(members);
  }
}
