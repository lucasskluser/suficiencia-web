import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GetUsuarioDTO } from '../dtos/usuario.dto';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 50 })
  nome: string;

  @Column({ nullable: false, length: 60, unique: true })
  email: string;

  @Column({ nullable: false })
  senha: string;

  @CreateDateColumn({ nullable: false })
  dataCriacao: Date;

  @UpdateDateColumn({ nullable: true })
  dataAtualizacao: Date;

  constructor(partial: Partial<UsuarioEntity>) {
    Object.assign(this, partial);
  }

  toDTO(): GetUsuarioDTO {
    return new GetUsuarioDTO({
      id: this.id,
      nome: this.nome,
      email: this.email,
      dataCriacao: this.dataCriacao,
      dataAtualizacao: this.dataAtualizacao,
    });
  }
}
