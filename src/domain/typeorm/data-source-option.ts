import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { CategoriesFactory } from './seeder/factories/categories.factory';
import { CategoriesSeeder } from './seeder/seeders/categories.seeder';
import { KeywordsSeeder } from './seeder/seeders/keywords.seeder';
import { KeywordsFactories } from './seeder/factories/keywords.factoy';
import { KeywordCategoriesSeeder } from './seeder/seeders/keyword-categories.seeder';
import { MentorsSeeder } from './seeder/seeders/mentors.seeder';
import { MentorKeywordsSeeder } from './seeder/seeders/mentor-keywords.seeder';
import { CommentsSeeder } from './seeder/seeders/comments.seeder';
import { CommentsFactories } from './seeder/factories/comments.factoy';
import { CadetsSeeder } from './seeder/seeders/cadets.seeder';
import { CadetsFactory } from './seeder/factories/cadets.factoy';
import { MentoringLogsSeeder } from './seeder/seeders/mentoring-logs.seeder';
import { MentoringLogsFactory } from './seeder/factories/mentoring-logs.factory';
import { ReportsFactory } from './seeder/factories/reports.factoy';
import { ReportsSeeder } from './seeder/seeders/reports.seeder';

interface EntityOption {
  entities: string[];
}

interface MigrationOption {
  migrations: string[];
}

// エンティティ設定を追加する必要がある
// 例えば、TypeOrmModule.forRoot({ ...basicOption, ...entityDynamicOption }),
export const basicOption: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
};

// Nestの場合はjs形式のエティティが必要
export const entityDynamicOption: EntityOption = {
  entities: [process.env.TYPEORM_NEST_ENTITIES],
};

// Seeding, Magrationの場合はTs形式のエティティが必要
export const entityTsOption: EntityOption = {
  entities: [process.env.TYPEORM_ENTITIES],
};

// Seeding依存性の地図
// [KeywordsSeeder, KeywordsFactories], [CategoriesSeeder, CategoriesFactory]  > KeywordCategoriesSeeder
// [KeywordsSeeder, KeywordsFactories], [MentorsSeeder] > MentorKeywordsSeeder
//                                      [MentorsSeeder], [CadetsSeeder, CadetsFactory] > [CommentsSeeder, CommentsFactories]
//                                      [MentorsSeeder], [CadetsSeeder, CadetsFactory] > [MentoringLogsSeeder, MentoringLogsFactory]
//                                      [MentorsSeeder], [CadetsSeeder, CadetsFactory], [MentoringLogsSeeder, MentoringLogsFactory] > [ReportsSeeder, ReportsFactory]

// 初回、Seeding全体で入れること可能である
// ２回以上には、
// [KeywordsSeeder, KeywordsFactories], [CategoriesSeeder, CategoriesFactory]  > KeywordCategoriesSeederは注釈必要
//  Keyword,Categoriesはデータを新しく生成しなし、seeder/dataフォルダーから決まっているデータを持ってくる状況である

export const seedingOption: SeederOptions = {
  factories: [
    // CategoriesFactory,
    // KeywordsFactories,
    CommentsFactories,
    CadetsFactory,
    CommentsFactories,
    MentoringLogsFactory,
    ReportsFactory,
  ],
  seeds: [
    // CategoriesSeeder,
    // KeywordsSeeder,
    // KeywordCategoriesSeeder,
    MentorsSeeder,
    MentorKeywordsSeeder,
    CadetsSeeder,
    CommentsSeeder,
    MentoringLogsSeeder,
    ReportsSeeder,
  ],
};

export const migrationOption: MigrationOption = {
  migrations: ['src/domain/typeorm/migrations/targets/*.ts'],
};
