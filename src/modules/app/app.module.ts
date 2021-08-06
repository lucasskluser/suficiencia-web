import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoModule } from '../aluno/aluno.module';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { UsuarioModule } from '../usuario/usuario.module';
import configuration from './config/app.configuration';

@Module({
  imports: [
    AlunoModule,
    UsuarioModule,
    AutenticacaoModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: ['**/**/*.entity.js'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
