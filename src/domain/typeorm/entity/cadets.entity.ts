import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comments } from './comments.entity';
import { MentoringLogs } from './mentoring-logs.entity';
import { Reports } from './reports.entity';

@Entity()
export class Cadets {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //大半のロジックがIntraIdでDBに接続しているので、重複の際は予想的ない動作をする
  @Column({ type: 'varchar', length: 15, unique: true })
  intraId: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  profileImage: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  resumeUrl: string;

  @Column({ type: 'boolean' })
  isCommon: boolean;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Comments, (Comments) => Comments.cadets)
  comments: Promise<Comments[]>;

  @OneToMany(() => MentoringLogs, (MentoringLogs) => MentoringLogs.cadets)
  mentoringLogs: Promise<MentoringLogs[]>;

  @OneToMany(() => Reports, (Reports) => Reports.cadets)
  reports: Promise<Reports[]>;
}
