import { setSeederFactory } from 'typeorm-extension';
import { fakerJA } from '@faker-js/faker';
import { Cadets } from '../../entity/cadets.entity';
import { Mentors } from '../../entity/mentors.entity';
import { Comments } from '../../entity/comments.entity';

interface CommentsFactoryMeta {
  cadetsMeta: Cadets[];
  mentorsMeta: Mentors[];
}

export const CommentsFactories = setSeederFactory(
  Comments,
  (faker, meta: CommentsFactoryMeta) => {
    const comments = new Comments();

    comments.cadets = Promise.resolve(
      meta.cadetsMeta[faker.number.int(meta.cadetsMeta.length - 1)],
    );

    comments.mentors = Promise.resolve(
      meta.mentorsMeta[faker.number.int(meta.mentorsMeta.length - 1)],
    );

    comments.content = fakerJA.lorem.lines(2);

    return comments;
  },
);
