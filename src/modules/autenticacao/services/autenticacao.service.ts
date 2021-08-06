import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUsuarioDTO } from 'src/modules/usuario/dtos/usuario.dto';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async autenticar(email: string, senha: string): Promise<GetUsuarioDTO> {
    try {
      return await this.usuarioService.verificarEmailSenha(email, senha);
    } catch (error) {
      return null;
    }
  }

  async gerarToken(usuario: GetUsuarioDTO) {
    const payload = {
      sub: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
