import {
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { MentorKeywords } from './mentorKeywords.entity';
import { Comments } from './comments.entity';
import { MentoringLogs } from './mentoring-logs.entity';
import { Reports } from './reports.entity';

@Entity()
export class Mentors {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  intraId: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  slackId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  company: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  duty: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', nullable: true })
  availableTime: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  introduction: string;

  @Column({ type: 'varchar', length: 150, nullable: true, array: true })
  tags: string[];

  @Column({ type: 'boolean' })
  isActive: boolean;

  @Column({ type: 'text', nullable: true })
  markdownContent: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;

  @OneToMany(() => MentorKeywords, (mentorKeywords) => mentorKeywords.mentors)
  mentorKeywords: Promise<MentorKeywords[]>;

  @OneToMany(() => Comments, (Comments) => Comments.mentors)
  comments: Promise<Comments[]>;

  @OneToMany(() => MentoringLogs, (MentoringLogs) => MentoringLogs.mentors)
  mentoringLogs: Promise<MentoringLogs[]>;

  @OneToMany(() => Reports, (Reports) => Reports.mentors)
  reports: Promise<Reports>;
}
