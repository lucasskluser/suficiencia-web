import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateUsuarioDTO,
  EditUsuarioDTO,
  EditUsuarioSenhaDTO,
  GetUsuarioDTO,
} from '../../dtos/usuario.dto';
import { UsuarioService } from '../../services/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get(':id')
  async obterUsuario(@Param('id') id: string): Promise<GetUsuarioDTO> {
    const usuario = await this.usuarioService.obterUsuarioPorId(parseInt(id));

    if (!usuario) {
      throw new NotFoundException(`Usuário com id '${id}' não encontrado`);
    }

    return usuario;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async criarUsuario(
    @Body() usuario: CreateUsuarioDTO,
  ): Promise<GetUsuarioDTO> {
    return await this.usuarioService.criarUsuario(
      new CreateUsuarioDTO(usuario),
    );
  }

  @Put(':id')
  async editarUsuario(
    @Param('id') id: string,
    @Body() usuario: EditUsuarioDTO,
  ): Promise<GetUsuarioDTO> {
    usuario = new EditUsuarioDTO(usuario);

    if (parseInt(id) !== usuario.id) {
      throw new BadRequestException(
        'O id do usuário informado na URL é diferente do id informado no corpo da requisição',
      );
    }

    return await this.usuarioService.editarUsuario(usuario);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async alterarSenha(
    @Param('id') id: string,
    @Body() usuario: EditUsuarioSenhaDTO,
  ) {
    usuario = new EditUsuarioSenhaDTO(usuario);

    if (parseInt(id) !== usuario.id) {
      throw new BadRequestException(
        'O id do usuário informado na URL é diferente do id informado no corpo da requisição',
      );
    }

    await this.usuarioService.alterarSenha(usuario);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletarUsuario(@Param('id') id: string) {
    await this.usuarioService.deletarUsuario(parseInt(id));
  }
}
