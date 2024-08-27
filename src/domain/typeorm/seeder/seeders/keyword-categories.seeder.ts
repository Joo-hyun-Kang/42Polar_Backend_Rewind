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
      keywordCategoriesData.map(async data => {
        const category = await categoryRepository.findOne({
          select: { id: true },
          where: { name: data.categories },
        });

        await Promise.all(
          data.keywords.map(async keywordData => {
            const keyword = await keywordRepository.findOne({
              select: { id: true },
              where: { name: keywordData },
            });

            //TypeORM の create メソッドでは、リレーションのプロパティに Promise を渡すと正しく動作しない場合がある
            //そのため、KeywordCategories修正
            const newData = keywordCategoriesRepository.create({
              keywords: keyword,
              categories: category,
            });

            return keywordCategoriesRepository.save(newData);
          }),
        );
      }),
    );
  }
}
