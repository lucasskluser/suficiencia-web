import { Injectable } from '@nestjs/common';
import { GetUsuarioDTO } from 'src/modules/usuario/dtos/usuario.dto';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';

@Injectable()
export class AutenticacaoService {
  constructor(private readonly usuarioService: UsuarioService) {}

  async autenticar(email: string, senha: string): Promise<GetUsuarioDTO> {
    try {
      return await this.usuarioService.verificarEmailSenha(email, senha);
    } catch (error) {
      return null;
    }
  }
}
