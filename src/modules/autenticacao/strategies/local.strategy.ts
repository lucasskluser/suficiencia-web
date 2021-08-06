import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly autenticacaoService: AutenticacaoService) {
    super({ usernameField: 'email', passwordField: 'senha' });
  }

  async validate(email: string, senha: string): Promise<any> {
    const usuario = await this.autenticacaoService.autenticar(email, senha);

    if (!usuario) {
      throw new UnauthorizedException(
        'Os dados de acesso do usuário são inválidos',
      );
    }

    return usuario;
  }
}
