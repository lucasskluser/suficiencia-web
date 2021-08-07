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
      useFactory: async (configService: ConfigService) => {
        console.log('jwt.secret', configService.get('jwt.secret'));

        return {
          secret: configService.get('jwt.secret'),
          signOptions: {
            expiresIn: configService.get('jwt.expiration'),
            issuer: configService.get('jwt.issuer'),
            audience: configService.get('jwt.audience'),
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([RefreshTokenEntity]),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService, LocalStrategy, JwtStrategy, TokenService],
})
export class AutenticacaoModule {}
