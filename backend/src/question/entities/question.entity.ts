// question/entities/question.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Option } from '../../option/entities/option.entity'; // 🔥 Importação crucial

@Entity('questions') // Define o nome da tabela no MySQL
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  // 🔥 Relacionamento: Uma questão tem muitas opções
  @OneToMany(() => Option, (option) => option.question)
  options!: Option[];
}