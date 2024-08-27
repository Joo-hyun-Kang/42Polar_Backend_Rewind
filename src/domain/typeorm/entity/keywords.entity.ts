import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { KeywordCategories } from './keywordCategories.entity';
import { MentorKeywords } from './mentorKeywords.entity';

@Entity()
export class Keywords {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name: string;

  @OneToMany(
    () => KeywordCategories,
    KeywordCategories => KeywordCategories.keywords,
  )
  keywordCategories: Promise<KeywordCategories[]>;

  @OneToMany(() => MentorKeywords, mentorKeywords => mentorKeywords.keywords)
  mentorKeywords: Promise<MentorKeywords[]>;
}
