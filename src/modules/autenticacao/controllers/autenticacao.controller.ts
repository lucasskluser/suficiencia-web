import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { UsuarioService } from 'src/modules/usuario/services/usuario.service';
import { TokensDTO } from '../dtos/autenticacao.dto';
import { LocalAuthGuard } from '../guards/local.guard';
import { TokenService } from '../services/token.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async autenticar(@Req() requisicao: any) {
    return this.tokenService.gerarTokens(requisicao.user);
  }

  @Put()
  async reautenticar(@Body() tokens: TokensDTO): Promise<TokensDTO> {
    const payload = this.tokenService.decodeToken(tokens.accessToken);

    const tokenValido = await this.tokenService.validarRefreshToken(
      payload.sub,
      tokens.refreshToken,
    );

    if (!tokenValido) {
      throw new UnauthorizedException('O refresh token informado é inválido');
    }

    const usuario = await this.usuarioService.obterUsuarioPorId(payload.sub);

    if (!usuario) {
      throw new UnprocessableEntityException(
        'O access token informado é inválido',
      );
    }

    return await this.tokenService.gerarTokens(usuario);
  }
}
