// question/entities/question.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Option } from '../../option/entities/option.entity'; // Importação crucial
import { Survey } from '../../survey/entities/survey.entity';

export enum QuestionType {
  RATING = 'RATING',
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  TEXT = 'TEXT',
  RECOMMENDATION = 'RECOMMENDATION',
}

@Entity('questions') // Define o nome da tabela no MySQL
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  category!: string;

  @Column()
  step!: number;

  @Column()
  order!: number;

  @Column()
  surveyId!: number;

  @Column({
    type: 'enum',
    enum: QuestionType,
  })
  type!: QuestionType;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'surveyId' })
  survey!: Survey;

  // Relacionamento: Uma questão tem muitas opções
  @OneToMany(() => Option, (option) => option.question, {
    cascade: true,
  })
  options!: Option[];
}
