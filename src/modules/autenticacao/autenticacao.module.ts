import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../usuario/usuario.module';
import { AutenticacaoController } from './controllers/autenticacao.controller';
import { RefreshTokenEntity } from './entities/refreshToken.entity';
import { AutenticacaoService } from './services/autenticacao.service';
import { TokenService } from './services/token.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UsuarioModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_ACCESS_EXPIRATION'),
          issuer: configService.get('JWT_ISSUER'),
          audience: configService.get('JWT_AUDIENCE'),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, LocalStrategy, JwtStrategy, TokenService],
})
export class AutenticacaoModule {}
