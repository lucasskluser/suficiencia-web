import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlunoDTO, EditAlunoDTO, GetAlunoDTO } from '../dtos/aluno.dto';
import { AlunoEntity } from '../entities/aluno.entity';

@Injectable()
export class AlunoService {
  @InjectRepository(AlunoEntity)
  private readonly alunoRepository: Repository<AlunoEntity>;

  async obterAlunos(): Promise<GetAlunoDTO[]> {
    const alunos = await this.alunoRepository.find();
    return alunos.map((aluno: AlunoEntity) => aluno.toDTO());
  }

  async obterAlunoPorId(id: number): Promise<GetAlunoDTO> {
    const aluno = await this.alunoRepository.findOne({ id });

    if (!aluno) {
      return null;
    }

    return aluno.toDTO();
  }

  async criarAluno(dto: CreateAlunoDTO): Promise<GetAlunoDTO> {
    const alunoExistente = await this.alunoRepository.findOne(
      {
        telefone: dto.telefone,
      },
      { withDeleted: true },
    );

    if (alunoExistente) {
      throw new ConflictException(
        `Um aluno com o telefone '${dto.telefone}' já existe`,
      );
    }

    const aluno = await this.alunoRepository.save(dto.toEntity());
    return aluno.toDTO();
  }

  async editarAluno(dto: EditAlunoDTO): Promise<GetAlunoDTO> {
    const alunoExistente = await this.obterAlunoPorId(dto.id);

    if (!alunoExistente) {
      throw new NotFoundException(
        `O aluno com id '${dto.id}' não foi encontrado`,
      );
    }

    const aluno = await this.alunoRepository.save(dto.toEntity());
    return aluno.toDTO();
  }

  async deletarAluno(id: number): Promise<boolean> {
    const aluno = await this.obterAlunoPorId(id);

    if (!aluno) {
      throw new NotFoundException(`O aluno com id '${id}' não foi encontrado`);
    }

    await this.alunoRepository.delete({ id: aluno.id });
    return true;
  }
}
