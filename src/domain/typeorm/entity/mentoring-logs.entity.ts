import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mentors } from './mentors.entity';
import { Reports } from './reports.entity';
import { Cadets } from './cadets.entity';

export enum LOG_STATUS {
  WATING = 'お待ち中',
  CANCEL = '取消',
  CONFIRMED = '確定',
  DONE = '完了',
}

@Entity()
export class MentoringLogs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', nullable: true, array: true })
  meetingAt: Date[];

  @Column({ type: 'timestamptz', nullable: true })
  meetingStart: Date;

  @Column({ type: 'varchar', length: 100 })
  topic: string;

  @Column({ type: 'varchar', length: 1000 })
  content: string;

  @Column({ type: 'enum', enum: LOG_STATUS, default: LOG_STATUS.WATING })
  status: LOG_STATUS;

  @Column({ type: 'varchar', length: 500, nullable: true })
  rejectMessage: string;

  @Column({ type: 'timestamptz', array: true })
  requestTime1: Date[];

  @Column({ type: 'timestamptz', nullable: true, array: true })
  requestTime2: Date[];

  @Column({ type: 'timestamptz', nullable: true, array: true })
  requestTime3: Date[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;

  @ManyToOne(() => Mentors, (Mentors) => Mentors.mentoringLogs)
  mentors: Promise<Mentors>;

  @ManyToOne(() => Cadets, (Cadets) => Cadets.mentoringLogs)
  cadets: Promise<Cadets>;

  @OneToOne(() => Reports, (Reports) => Reports.mentoringLogs)
  reports: Promise<Reports>;
}
