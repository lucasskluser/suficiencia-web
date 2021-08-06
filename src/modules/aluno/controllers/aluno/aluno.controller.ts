import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateAlunoDTO,
  EditAlunoDTO,
  GetAlunoDTO,
} from '../../dtos/aluno.dto';
import { AlunoService } from '../../services/aluno.service';

@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  async obterAlunos(): Promise<GetAlunoDTO[]> {
    const alunos = await this.alunoService.obterAlunos();
    return alunos;
  }

  async obterAlunoPorId(@Param('id') id: string): Promise<GetAlunoDTO> {
    const aluno = await this.alunoService.obterAlunoPorId(parseInt(id));

    if (!aluno) {
      throw new NotFoundException(`O aluno com id '${id}' não foi encontrado`);
    }

    return aluno;
  }

  @Post()
  async criarAluno(@Body() aluno: CreateAlunoDTO): Promise<GetAlunoDTO> {
    return await this.alunoService.criarAluno(new CreateAlunoDTO(aluno));
  }

  @Put(':id')
  async editarAluno(
    @Param('id') id: string,
    @Body() aluno: EditAlunoDTO,
  ): Promise<GetAlunoDTO> {
    aluno = new EditAlunoDTO(aluno);

    if (parseInt(id) !== aluno.id) {
      throw new BadRequestException(
        'O id informado na URL é diferente do id informado no corpo da requisição',
      );
    }

    return await this.alunoService.editarAluno(aluno);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async excluirAluno(@Param('id') id: string) {
    const deletado = await this.alunoService.deletarAluno(parseInt(id));

    if (!deletado) {
      throw new InternalServerErrorException("Não foi possível deletar o aluno");
    }
  }
}
