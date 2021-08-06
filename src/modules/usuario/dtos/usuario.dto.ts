import {
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UsuarioEntity } from '../entities/usuario.entity';

export class GetUsuarioDTO {
  id: number;
  nome: string;
  email: string;
  dataCriacao: Date;
  dataAtualizacao: Date;

  constructor(partial: Partial<GetUsuarioDTO>) {
    Object.assign(this, partial);
  }
}

export class CreateUsuarioDTO {
  @IsString({ message: 'O nome do usuário deve ser do tipo texto (string)' })
  @MinLength(3, {
    message: 'O nome do usuário deve ter, no mínimo, 3 caracteres',
  })
  @MaxLength(50, {
    message: 'O nome do usuário deve ter, no máximo, 50 caracteres',
  })
  nome: string;

  @IsEmail({}, { message: 'O e-mail do usuário deve ser válido' })
  email: string;

  @IsString({ message: 'A senha do usuário deve ser do tipo texto (string)' })
  @MinLength(8, {
    message: 'A senha do usuário deve ter, no mínimo, 8 caracteres',
  })
  @MaxLength(255, {
    message: 'A senha do usuário deve ter, no máximo, 255 caracteres',
  })
  senha: string;

  constructor(partial: Partial<CreateUsuarioDTO>) {
    Object.assign(this, partial);
  }

  toEntity(): UsuarioEntity {
    const usuario = new UsuarioEntity({
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    });

    return usuario;
  }
}

export class EditUsuarioDTO {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: 'O id do usuário deve ser um número inteiro' },
  )
  id: number;

  @IsString({ message: 'O nome do usuário deve ser do tipo texto (string)' })
  @MinLength(3, {
    message: 'O nome do usuário deve ter, no mínimo, 3 caracteres',
  })
  @MaxLength(50, {
    message: 'O nome do usuário deve ter, no máximo, 50 caracteres',
  })
  nome: string;

  @IsEmail({}, { message: 'O e-mail do usuário deve ser válido' })
  email: string;

  constructor(partial?: Partial<EditUsuarioDTO>) {
    Object.assign(this, partial);
  }
}

export class EditUsuarioSenhaDTO {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: 'O id do usuário deve ser um número inteiro' },
  )
  id: number;

  @IsString({
    message: 'A senha atual do usuário deve ser do tipo texto (string)',
  })
  @MinLength(8, {
    message: 'A senha atual do usuário deve ter, no mínimo, 8 caracteres',
  })
  @MaxLength(255, {
    message: 'A senha atual do usuário deve ter, no máximo, 255 caracteres',
  })
  senhaAtual: string;

  @IsString({
    message: 'A nova senha do usuário deve ser do tipo texto (string)',
  })
  @MinLength(8, {
    message: 'A nova senha do usuário deve ter, no mínimo, 8 caracteres',
  })
  @MaxLength(255, {
    message: 'A nova senha do usuário deve ter, no máximo, 255 caracteres',
  })
  novaSenha: string;

  @IsString({
    message:
      'A confirmação da nova senha do usuário deve ser do tipo texto (string)',
  })
  @MinLength(8, {
    message:
      'A confirmação da nova senha do usuário deve ter, no mínimo, 8 caracteres',
  })
  @MaxLength(255, {
    message:
      'A confirmação da nova senha do usuário deve ter, no máximo, 255 caracteres',
  })
  confirmacaoNovaSenha: string;

  constructor(partial?: Partial<EditUsuarioSenhaDTO>) {
    Object.assign(this, partial);
  }
}
