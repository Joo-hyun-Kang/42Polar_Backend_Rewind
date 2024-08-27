import { setSeederFactory } from 'typeorm-extension';
import { Member } from '../../entity/member.entity';
import { Faker, ja } from '@faker-js/faker';

export const MembersFactory = setSeederFactory(Member, () => {
  const faker = new Faker({ locale: [ja] });

  const member = new Member();
  member.username = faker.person.fullName();
  member.age = faker.number.int({ min: 18, max: 60 });

  return member;
});
