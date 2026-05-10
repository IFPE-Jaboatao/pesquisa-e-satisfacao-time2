import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Survey } from '../../survey/entities/survey.entity';
import { ResponseItem } from './response-item.entity';

@Entity('responses')
@Unique(['surveyId', 'respondentToken'])
export class Response {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  surveyId!: number;

  @ManyToOne(() => Survey, (survey) => survey.responses, {
    onDelete: 'CASCADE',
  })
  survey!: Survey;

  @Column({ length: 100, nullable: true })
  course?: string;

  @Column({ length: 20, nullable: true })
  period?: string;

  @Column({ length: 20, nullable: true })
  shift?: string;

  @Column({ length: 100, nullable: true })
  campus?: string;

  @Column({ type: 'text', nullable: true })
  finalComment?: string;

  @Column({ nullable: true })
  wouldRecommend?: boolean;

  @Column({ length: 255 })
  respondentToken!: string;

  @OneToMany(() => ResponseItem, (item) => item.response, {
    cascade: true,
  })
  items!: ResponseItem[];

  @CreateDateColumn()
  createdAt!: Date;
}
