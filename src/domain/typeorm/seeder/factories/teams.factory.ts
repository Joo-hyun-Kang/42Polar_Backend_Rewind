import { Faker, ja } from '@faker-js/faker';
import { Team } from '../../entity/team.entity';
import { setSeederFactory } from 'typeorm-extension';

export const TeamsFactory = setSeederFactory(Team, () => {
  const faker = new Faker({ locale: [ja] });

  const team = new Team();
  team.name = faker.company.name();

  return team;
});
