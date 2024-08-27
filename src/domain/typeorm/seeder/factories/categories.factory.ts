import { setSeederFactory } from 'typeorm-extension';
import { Categories } from '../../entity/categories.entity';

export const CategoriesFactory = setSeederFactory(Categories, () => {
  const categories = new Categories();

  return categories;
});
