import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Categories } from '../../entity/categories.entity';

export class CategoriesSeeder implements Seeder {
  categoriesList: string[] = [
    '就職',
    '企業',
    '協業',
    '企画',
    '開発',
    'Tech',
    'CS',
    '専門分野',
  ];

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const categoriesFactory = factoryManager.get(Categories);

    const categories = await Promise.all(
      Array(this.categoriesList.length)
        .fill('')
        .map(async (v, i: number) => {
          const categorie = await categoriesFactory.make({
            name: this.categoriesList[i],
          });
          return categorie;
        }),
    );

    const categoriesRepo = dataSource.getRepository(Categories);
    await categoriesRepo.save(categories);
  }
}
