import { Controller, Get } from '@nestjs/common';
import { AlunoEntity } from '../../entities/aluno.entity';

@Controller('aluno')
export class AlunoController {
  @Get()
  obterAlunos(): AlunoEntity[] {
    return [
      {
        id: 1,
        nome: 'Lucas Samuel',
        telefone: '4799999991',
      },
      {
        id: 2,
        nome: 'Matheus Boing',
        telefone: '4799999992',
      },
    ];
  }
}
