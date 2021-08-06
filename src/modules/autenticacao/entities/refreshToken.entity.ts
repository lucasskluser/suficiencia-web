import { UsuarioEntity } from 'src/modules/usuario/entities/usuario.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_tokens')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 400 })
  token: string;

  @ManyToOne(() => UsuarioEntity)
  usuario: UsuarioEntity;
}
