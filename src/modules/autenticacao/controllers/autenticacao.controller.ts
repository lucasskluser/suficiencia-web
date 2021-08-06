import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local.guard';
import { AutenticacaoService } from '../services/autenticacao.service';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async autenticar(@Req() requisicao: any) {
    return this.autenticacaoService.gerarToken(requisicao.user);
  }
}
