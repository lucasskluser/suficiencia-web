import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { AlunoEntity } from '../entities/aluno.entity';

export class GetAlunoDTO {
  id: number;
  nome: string;
  telefone: string;
  dataCriacao: Date;
  dataAtualizacao?: Date;
  dataDelecao?: Date;

  constructor(partial?: Partial<GetAlunoDTO>) {
    Object.assign(this, partial);
  }
}

export class CreateAlunoDTO {
  @IsString({ message: 'O nome do aluno deve ser do tipo texto (string)' })
  @MinLength(3, {
    message: 'O nome do aluno deve ter, no mínimo, 3 caracteres',
  })
  @MaxLength(50, {
    message: 'O nome do aluno deve ter, no máximo, 50 caracteres',
  })
  nome: string;

  @IsString({ message: 'O telefone do aluno deve ser do tipo texto (string)' })
  @MinLength(9, {
    message: 'O telefone do aluno deve ter, no mínimo, 9 caracteres',
  })
  @MaxLength(15, {
    message: 'O telefone do aluno deve ter, no máximo, 15 caracteres',
  })
  telefone: string;

  constructor(partial?: Partial<CreateAlunoDTO>) {
    Object.assign(this, partial);
  }

  toEntity(): AlunoEntity {
    return new AlunoEntity(this.nome, this.telefone);
  }
}

export class EditAlunoDTO {
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: 'O id do aluno deve ser um número inteiro' },
  )
  id: number;

  @IsString({ message: 'O nome do aluno deve ser do tipo texto (string)' })
  @MinLength(3, {
    message: 'O nome do aluno deve ter, no mínimo, 3 caracteres',
  })
  @MaxLength(50, {
    message: 'O nome do aluno deve ter, no máximo, 50 caracteres',
  })
  nome: string;

  @IsString({ message: 'O telefone do aluno deve ser do tipo texto (string)' })
  @MinLength(9, {
    message: 'O telefone do aluno deve ter, no mínimo, 9 caracteres',
  })
  @MaxLength(15, {
    message: 'O telefone do aluno deve ter, no máximo, 15 caracteres',
  })
  telefone: string;

  constructor(partial?: Partial<CreateAlunoDTO>) {
    Object.assign(this, partial);
  }

  toEntity(): AlunoEntity {
    const aluno = new AlunoEntity(this.nome, this.telefone);
    aluno.id = this.id;
    return aluno;
  }
}
