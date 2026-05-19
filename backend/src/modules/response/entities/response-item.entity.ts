import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Response } from './response.entity';

@Entity('response_items')
export class ResponseItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  responseId!: number;

  @ManyToOne(() => Response, (response) => response.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'responseId' })
  response!: Response;

  @Column()
  questionId!: number;

  @Column({ nullable: true })
  ratingValue?: number;

  @Column({ length: 100, nullable: true })
  selectedOption?: string;

  @Column({ type: 'text', nullable: true })
  textAnswer?: string;

  @CreateDateColumn()
  createdAt!: Date;
}
