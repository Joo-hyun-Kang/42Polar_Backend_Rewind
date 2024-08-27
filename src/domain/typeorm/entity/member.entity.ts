import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Entity,
  JoinColumn,
} from 'typeorm';
import { Team } from './team.entity';

export enum MemberType {
  NORAML = 'NORMAL',
  ADMIN = 'ADMIN',
}

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column({ nullable: true }) // 新しいフィールド
  email: string;

  @ManyToOne(() => Team, team => team.members)
  @JoinColumn()
  team: Promise<Team>;

  @Column({
    type: 'enum',
    enum: MemberType,
    default: MemberType.NORAML,
  })
  type: MemberType;

  async changeTeam(teamPromise: Promise<Team>) {
    //注意！：現在のチームがあらば、それから出るロージックは省略している
    const newTeam = await teamPromise;
    (await newTeam.members).push(this);
    this.team = Promise.resolve(newTeam);
  }
}
