import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { getColor } from '../helpers/get-color.helper';
import { Disaster } from './disaster.entity';
import { Location } from './location.entity';
import { Region } from './region.entity';
import { Comment } from './comment.entity';

export enum UserRoles {
  Admin = 'admin',
  User = 'user',
}

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.User,
  })
  role: string;

  @Column({ type: 'varchar', default: '' })
  avatar: string;

  @Column({
    type: 'varchar',
    default: getColor(),
  })
  color: string;

  @OneToMany(() => Disaster, (disaster) => disaster.user)
  disasters: Disaster[];

  @OneToMany(() => Location, (location) => location.user)
  locations: Location[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Region, (region) => region.user)
  regions: Region[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
