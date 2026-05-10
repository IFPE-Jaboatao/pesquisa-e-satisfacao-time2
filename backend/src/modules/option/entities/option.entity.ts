// option/entities/option.entity.ts

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../question/entities/question.entity';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  label!: string;

  @Column({ length: 100, nullable: true })
  value?: string;

  @Column({ nullable: true })
  score?: number;

  @Column()
  questionId!: number;

  @ManyToOne(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  question!: Question;
}
