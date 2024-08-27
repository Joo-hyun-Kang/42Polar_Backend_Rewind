import { setSeederFactory } from 'typeorm-extension';
import { Keywords } from '../../entity/keywords.entity';
import { faker } from '@faker-js/faker';

export const KeywordsFactories = setSeederFactory(Keywords, () => {
  const keywords = new Keywords();
  return keywords;
});
