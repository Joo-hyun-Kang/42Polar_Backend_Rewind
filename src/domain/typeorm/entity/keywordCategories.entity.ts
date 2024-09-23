import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Keywords } from './keywords.entity';
import { Categories } from './categories.entity';

@Entity()
export class KeywordCategories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Keywords, (Keywords) => Keywords.keywordCategories)
  keywords: Promise<Keywords>;

  @ManyToOne(() => Categories, (Categoires) => Categoires.keywordCategories)
  categories: Promise<Categories>;
}
