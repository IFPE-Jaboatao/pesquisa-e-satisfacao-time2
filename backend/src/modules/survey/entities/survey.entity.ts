import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Response } from '../../response/entities/response.entity';
import { Question } from '../../question/entities/question.entity';

@Entity('surveys')
export class Survey {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'datetime', nullable: true })
  startDate?: Date | null;

  @Column({ type: 'datetime', nullable: true })
  endDate?: Date | null;

  @Column({ default: true })
  isAnonymous!: boolean;

  @OneToMany(() => Response, (response) => response.survey)
  responses!: Response[];

  @OneToMany(() => Question, (question) => question.survey)
  questions!: Question[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
