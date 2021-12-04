import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from './user.entity';
import { Region } from './region.entity';
import { Comment } from './comment.entity';

export enum DisasterScope {
  Local = 1,
  Regional = 2,
  Global = 3,
  Worldwide = 4,
}

export enum DisasterType {
  Geophysical = 1,
  Hydrological = 2,
  Climatological = 3,
  Meteorological = 4,
  Biological = 5,
}

export enum DisasterSubtype {
  Earthquake = 1,
  Mass_movement = 2,
  Volcanic_activity = 3,
  Extreme_temperature = 4,
  Fog = 5,
  Storm = 6,
  Flood = 7,
  Landslide = 8,
  Wave_action = 9,
  Drought = 10,
  Glacial_Lake_Outburst = 11,
  Wildfire = 12,
  Epidemic = 13,
  Insect_infestation = 14,
  Animal_accident = 15,
  Impact = 16,
  Space_weather = 17,
}

@Entity({ name: 'disasters' })
export class Disaster extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'simple-array' })
  images: string[];

  @Column({
    type: 'enum',
    enum: DisasterScope,
    default: DisasterScope.Local,
  })
  scope: number;

  @Column({
    type: 'enum',
    enum: DisasterType,
    default: DisasterType.Climatological,
  })
  type: number;

  @Column({
    type: 'enum',
    enum: DisasterSubtype,
    default: DisasterSubtype.Earthquake,
  })
  subtype: number;

  @Column({ type: 'date' })
  date_start: Date;

  @Column({ type: 'date' })
  date_end: Date;

  @ManyToOne(() => User, (user) => user.disasters)
  user: User;

  @OneToMany(() => Region, (region) => region.disaster)
  regions: Region[];

  @OneToMany(() => Comment, (comment) => comment.disaster)
  comments: Comment[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
