import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUsuarioDTO } from 'src/modules/usuario/dtos/usuario.dto';
import { Repository } from 'typeorm';
import { TokensDTO } from '../dtos/autenticacao.dto';
import { RefreshTokenEntity } from '../entities/refreshToken.entity';

@Injectable()
export class TokenService {
  private readonly tokenBaseOptions: JwtSignOptions;

  @InjectRepository(RefreshTokenEntity)
  private readonly refreshTokenRepository: Repository<RefreshTokenEntity>;

  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.tokenBaseOptions = {
      audience: configService.get('jwt.audience'),
      issuer: configService.get('jwt.issuer'),
      expiresIn: configService.get('jwt.expiration.access'),
    };
  }

  async gerarTokens(usuario: GetUsuarioDTO): Promise<TokensDTO> {
    const accessToken = await this.gerarToken(usuario);
    const refreshToken = await this.gerarRefreshToken(usuario);

    return new TokensDTO({
      accessToken,
      refreshToken,
    });
  }

  async gerarToken(usuario: GetUsuarioDTO) {
    const payload = {
      sub: usuario.id,
    };

    return this.jwtService.sign(payload, this.tokenBaseOptions);
  }

  async gerarRefreshToken(usuario: GetUsuarioDTO): Promise<string> {
    const payload = {
      sub: usuario.id,
    };

    const refreshToken = this.jwtService.sign(payload, this.tokenBaseOptions);

    await this.refreshTokenRepository.delete({ usuario: { id: usuario.id } });

    await this.refreshTokenRepository.save({
      usuario: { id: usuario.id },
      token: refreshToken,
    });

    return refreshToken;
  }

  async validarRefreshToken(
    usuarioId: number,
    token: string,
  ): Promise<boolean> {
    const refreshToken = this.refreshTokenRepository.findOne({
      usuario: { id: usuarioId },
      token,
    });

    if (!refreshToken) {
      return false;
    }

    return true;
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token);
  }
}
