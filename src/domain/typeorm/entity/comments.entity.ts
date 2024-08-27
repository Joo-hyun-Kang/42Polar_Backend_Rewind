import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mentors } from './mentors.entity';
import { Cadets } from './cadets.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  content: string;

  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updateAt: Date;

  @ManyToOne(() => Mentors, Mentors => Mentors.comments)
  mentors: Mentors | Promise<Mentors>;

  @ManyToOne(() => Cadets, Cadets => Cadets.comments)
  cadets: Cadets | Promise<Cadets>;
}
