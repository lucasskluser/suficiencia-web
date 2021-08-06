import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GetAlunoDTO } from '../dtos/aluno.dto';

@Entity('alunos')
export class AlunoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  nome: string;

  @Column({ nullable: false, length: 15, unique: true })
  telefone: string;

  @CreateDateColumn({ nullable: false })
  dataCriacao: Date;

  @UpdateDateColumn({ nullable: true })
  dataAtualizacao?: Date;

  constructor(nome: string, telefone: string) {
    this.nome = nome;
    this.telefone = telefone;
  }

  toDTO(): GetAlunoDTO {
    return new GetAlunoDTO({
      id: this.id,
      nome: this.nome,
      telefone: this.telefone,
      dataCriacao: this.dataCriacao,
      dataAtualizacao: this.dataAtualizacao,
    });
  }
}
