import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { KeywordCategories } from './keywordCategories.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(
    () => KeywordCategories,
    KeywordCategories => KeywordCategories.categories,
  )
  keywordCategories: Promise<KeywordCategories[]>;
}
