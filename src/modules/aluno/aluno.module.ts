import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlunoController } from './controllers/aluno.controller';
import { AlunoEntity } from './entities/aluno.entity';
import { AlunoService } from './services/aluno.service';

@Module({
  imports: [TypeOrmModule.forFeature([AlunoEntity])],
  controllers: [AlunoController],
  providers: [AlunoService],
})
export class AlunoModule {}
