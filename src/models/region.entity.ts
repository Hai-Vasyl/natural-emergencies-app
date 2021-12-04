import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Location } from './location.entity';
import { Disaster } from './disaster.entity';

@Entity({ name: 'regions' })
export class Region extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User, (user) => user.regions)
  user: User;

  @ManyToOne(() => Disaster, (disaster) => disaster.regions)
  disaster: Disaster;

  @ManyToMany(() => Location, (location) => location.regions)
  @JoinTable()
  locations: Location[];
}
