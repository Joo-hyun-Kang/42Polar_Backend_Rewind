import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { keywordCategoriesData } from '../data/keyword-categories-data';
import { Categories } from '../../entity/categories.entity';
import { Keywords } from '../../entity/keywords.entity';
import { KeywordCategories } from '../../entity/keywordCategories.entity';

export class KeywordCategoriesSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(Categories);
    const keywordRepository = dataSource.getRepository(Keywords);
    const keywordCategoriesRepository =
      dataSource.getRepository(KeywordCategories);

    console.log('Seeding keyword-categories...');

    await Promise.all(
      keywordCategoriesData.map(async (data) => {
        const category = await categoryRepository.findOne({
          where: { name: data.categories },
        });

        await Promise.all(
          data.keywords.map(async (keywordData) => {
            const keyword = await keywordRepository.findOne({
              where: { name: keywordData },
            });

            const keywordCategories = new KeywordCategories();
            keywordCategories.categories = Promise.resolve(category);
            keywordCategories.keywords = Promise.resolve(keyword);

            return await keywordCategoriesRepository.save(keywordCategories);
          }),
        );
      }),
    );
  }
}
