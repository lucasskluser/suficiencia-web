import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/autenticacao/guards/jwt.guard';
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

  @Get()
  @UseGuards(JwtAuthGuard)
  async obterUsuario(@Req() requisicao: any): Promise<GetUsuarioDTO> {
    return requisicao.user;
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

  @Put()
  @UseGuards(JwtAuthGuard)
  async editarUsuario(
    @Req() requisicao: any,
    @Body() usuario: EditUsuarioDTO,
  ): Promise<GetUsuarioDTO> {
    usuario = new EditUsuarioDTO(usuario);
    return await this.usuarioService.editarUsuario(requisicao.user.id, usuario);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async alterarSenha(
    @Req() requisicao: any,
    @Body() usuario: EditUsuarioSenhaDTO,
  ) {
    usuario = new EditUsuarioSenhaDTO(usuario);
    await this.usuarioService.alterarSenha(requisicao.user.id, usuario);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletarUsuario(@Req() requisicao: any) {
    await this.usuarioService.deletarUsuario(requisicao.user.id);
  }
}
