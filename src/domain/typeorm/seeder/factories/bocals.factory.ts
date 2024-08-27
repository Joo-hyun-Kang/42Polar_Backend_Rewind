import { setSeederFactory } from 'typeorm-extension';
import { Bocals } from '../../entity/bocal.entity';
import { en, faker, Faker, fakerJA, ja } from '@faker-js/faker';

export const BoaclsFactory = setSeederFactory(Bocals, () => {
  const bocal = new Bocals();
  bocal.name = fakerJA.person.fullName();
  bocal.intraId = faker.person.firstName();

  return bocal;
});
