import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AutenticacaoDTO {
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

  constructor(partial: Partial<AutenticacaoDTO>) {
    Object.assign(this, partial);
  }
}

export class TokensDTO {
  @IsString({ message: 'O access token deve ser do tipo texto (string)' })
  accessToken: string;

  @IsString({ message: 'O refresh token deve ser do tipo texto (string)' })
  refreshToken: string;

  constructor(partial: Partial<TokensDTO>) {
    Object.assign(this, partial);
  }
}
