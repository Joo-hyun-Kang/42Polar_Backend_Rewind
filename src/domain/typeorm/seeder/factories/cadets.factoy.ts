import { setSeederFactory } from 'typeorm-extension';
import { fakerJA, faker } from '@faker-js/faker';
import { Cadets } from '../../entity/cadets.entity';

export const CadetsFactory = setSeederFactory(Cadets, () => {
  const cadets = new Cadets();

  cadets.name = fakerJA.person.fullName();
  cadets.intraId = faker.person.firstName();
  cadets.profileImage = faker.image.avatar();
  cadets.isCommon = faker.datatype.boolean();
  cadets.resumeUrl = faker.internet.url();
  cadets.email = faker.internet.email();

  return cadets;
});
