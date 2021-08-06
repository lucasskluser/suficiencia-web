import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUsuarioDTO,
  EditUsuarioDTO,
  EditUsuarioSenhaDTO,
  GetUsuarioDTO,
} from '../dtos/usuario.dto';
import { UsuarioEntity } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  @InjectRepository(UsuarioEntity)
  private readonly usuarioRepository: Repository<UsuarioEntity>;

  async obterUsuarioPorId(id: number): Promise<GetUsuarioDTO> {
    const usuario = await this.usuarioRepository.findOne({ id });

    if (!usuario) {
      return null;
    }

    return usuario.toDTO();
  }

  async obterUsuarioPorEmail(email: string): Promise<GetUsuarioDTO> {
    const usuario = await this.usuarioRepository.findOne({ email });

    if (!usuario) {
      return null;
    }

    return usuario.toDTO();
  }

  async criarUsuario(usuario: CreateUsuarioDTO): Promise<GetUsuarioDTO> {
    const usuarioExisente = await this.obterUsuarioPorEmail(usuario.email);

    if (usuarioExisente) {
      throw new ConflictException(
        `Um usuário com o e-mail '${usuario.email}' já existe`,
      );
    }

    const chave = await this.gerarChave();
    const hash = await this.hashSenha(chave, usuario.senha);

    const usuarioCriado = await this.usuarioRepository.save({
      ...usuario.toEntity(),
      senha: hash,
    });

    return new UsuarioEntity(usuarioCriado).toDTO();
  }

  async editarUsuario(
    id: number,
    usuario: EditUsuarioDTO,
  ): Promise<GetUsuarioDTO> {
    let usuarioExistente = await this.usuarioRepository.findOne({
      id,
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com id '${id}' não foi encontrado`);
    }

    usuarioExistente = this.usuarioRepository.merge(usuarioExistente, {
      nome: usuario.nome,
      email: usuario.email,
    });

    usuarioExistente = await this.usuarioRepository.save(usuarioExistente);
    return usuarioExistente.toDTO();
  }

  async alterarSenha(
    id: number,
    usuario: EditUsuarioSenhaDTO,
  ): Promise<boolean> {
    const usuarioExistente = await this.usuarioRepository.findOne({
      id,
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com id '${id}' não foi encontrado`);
    }

    if (!(await bcrypt.compare(usuario.senhaAtual, usuarioExistente.senha))) {
      throw new ForbiddenException('A senha atual do usuário está incorreta');
    }

    if (usuario.senhaAtual === usuario.novaSenha) {
      throw new UnprocessableEntityException(
        'A nova senha do usuário deve ser diferente da atual',
      );
    }

    if (usuario.novaSenha !== usuario.confirmacaoNovaSenha) {
      throw new UnprocessableEntityException(
        'A confirmação da nova senha do usuário deve ser igual a nova senha',
      );
    }

    const chave = await this.gerarChave();
    usuarioExistente.senha = await this.hashSenha(chave, usuario.novaSenha);

    await this.usuarioRepository.save(usuarioExistente);
    return true;
  }

  async deletarUsuario(id: number): Promise<boolean> {
    const usuarioExistente = await this.usuarioRepository.findOne({
      id,
    });

    if (!usuarioExistente) {
      throw new NotFoundException(`Usuário com id '${id}' não foi encontrado`);
    }

    await this.usuarioRepository.remove(usuarioExistente);
    return true;
  }

  private async gerarChave(): Promise<string> {
    return await bcrypt.genSalt();
  }

  async verificarEmailSenha(
    email: string,
    senha: string,
  ): Promise<GetUsuarioDTO> {
    const usuario = await this.usuarioRepository.findOne({ email });

    if (!usuario) {
      throw new NotFoundException(
        `Usuário com e-mail '${email}' não encontrado`,
      );
    }

    if (!(await bcrypt.compare(senha, usuario.senha))) {
      throw new UnauthorizedException('A senha do usuário está incorreta');
    }

    return usuario.toDTO();
  }

  private async hashSenha(chave: string, senha: string): Promise<string> {
    return await bcrypt.hash(senha, chave);
  }
}
