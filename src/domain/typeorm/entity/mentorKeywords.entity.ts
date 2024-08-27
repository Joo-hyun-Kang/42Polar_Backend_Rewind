import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Keywords } from './keywords.entity';
import { Mentors } from './mentors.entity';

@Entity()
export class MentorKeywords {
  @PrimaryGeneratedColumn('uuid')
  Id: string;

  @ManyToOne(() => Keywords, Keywords => Keywords.id)
  keywords: Keywords | Promise<Keywords>;

  @ManyToOne(() => Mentors, Mentors => Mentors.id)
  mentors: Mentors | Promise<Mentors>;
}
