import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Keywords } from '../../entity/keywords.entity';
import { keywordCategoriesData } from '../data/keyword-categories-data';

export class KeywordsSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const kewwordsFactory = factoryManager.get(Keywords);
    const keywordRepo = dataSource.getRepository(Keywords);

    //Keywordエンティティのnameはuniqueである
    const isOverlap: Set<string> = new Set();

    for (const data of keywordCategoriesData) {
      const keywords = await Promise.all(
        data.keywords.map(async (v, i: number) => {
          if (!isOverlap.has(data.keywords[i])) {
            isOverlap.add(data.keywords[i]);
            const keyword = await kewwordsFactory.make({
              name: data.keywords[i],
            });
            return keyword;
          }
        }),
      );

      const keywordsNotUndefindes = keywords.filter(
        (keyword) => keyword !== undefined,
      );

      await keywordRepo.save(keywordsNotUndefindes);
    }
  }
}
