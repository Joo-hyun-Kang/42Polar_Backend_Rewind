import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Keywords } from './keywords.entity';
import { Categories } from './categories.entity';

@Entity()
export class KeywordCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //TypeORM の create メソッドでは、リレーションのプロパティに Promise を渡すと正しく動作しない場合がある
  //そのため、Keywordsを追加する
  @ManyToOne(() => Keywords, keywords => keywords.keywordCategories)
  keywords: Keywords | Promise<Keywords>;

  @ManyToOne(() => Categories, categoires => categoires.keywordCategories)
  categories: Categories | Promise<Categories>;
}
