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
import { Disaster } from './disaster.entity';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'int', default: 0 })
  replyCount: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;

  @ManyToOne(() => Disaster, (disaster) => disaster.comments)
  disaster: Disaster;

  @OneToMany(() => Comment, (reply) => reply.comment, {
    onDelete: 'CASCADE',
  })
  replies: Comment[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
