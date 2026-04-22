import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Response } from './response.entity';

@Entity('response_items')
export class ResponseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  responseId: number;

  @ManyToOne(() => Response, (response) => response.items, {
    onDelete: 'CASCADE',
  })
  response: Response;

  @Column()
  questionId: number;

  @Column({ nullable: true })
  selectedValue?: number;

  @Column({ type: 'text', nullable: true })
  textAnswer?: string;

  @CreateDateColumn()
  createdAt: Date;
}