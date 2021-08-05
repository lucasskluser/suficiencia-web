import { Module } from '@nestjs/common';
import { AlunoController } from './controllers/aluno/aluno.controller';

@Module({
  controllers: [AlunoController],
})
export class AlunoModule {}
