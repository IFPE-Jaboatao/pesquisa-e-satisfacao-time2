// question/entities/question.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Option } from '../../option/entities/option.entity'; // 🔥 Importação crucial
import { Survey } from '../../survey/entities/survey.entity';

@Entity('questions') // Define o nome da tabela no MySQL
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  surveyId!: number;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
  })
  survey!: Survey;

  // 🔥 Relacionamento: Uma questão tem muitas opções
  @OneToMany(() => Option, (option) => option.question)
  options!: Option[];
}
