import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriasRepository } from './categorias.repository';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria, Prisma } from '../../generated/prisma/client';

@Injectable()
export class CategoriasService {
  constructor(private readonly categoriasRepository: CategoriasRepository) {}

  create(restauranteId: string, dto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriasRepository.create(restauranteId, dto);
  }

  findAll(restauranteId: string): Promise<Categoria[]> {
    return this.categoriasRepository.findAll(restauranteId);
  }

  async findOne(restauranteId: string, id: string): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findById(id, restauranteId);

    if (!categoria) {
      throw new NotFoundException(`La categoría ${id} no existe en tu restaurante`);
    }

    return categoria;
  }

  async update(restauranteId: string, id: string, dto: UpdateCategoriaDto): Promise<Categoria> {
    const categoria = await this.categoriasRepository.update(id, restauranteId, dto);

    if (!categoria) {
      throw new NotFoundException(`La categoría ${id} no existe en tu restaurante`);
    }

    return categoria;
  }

  async remove(restauranteId: string, id: string): Promise<void> {
    try {
      const eliminada = await this.categoriasRepository.remove(id, restauranteId);

      if (!eliminada) {
        throw new NotFoundException(`La categoría ${id} no existe en tu restaurante`);
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
        throw new ConflictException(
          'No podés eliminar una categoría que todavía tiene platos asociados',
        );
      }
      throw error;
    }
  }
}
