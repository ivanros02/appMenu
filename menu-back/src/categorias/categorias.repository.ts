import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Categoria, Prisma } from '../../generated/prisma/client';

@Injectable()
export class CategoriasRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(restauranteId: string, data: Prisma.CategoriaCreateWithoutRestauranteInput): Promise<Categoria> {
    return this.prisma.categoria.create({
      data: {
        ...data,
        restaurante: { connect: { id: restauranteId } },
      },
    });
  }

  findAll(restauranteId: string): Promise<Categoria[]> {
    return this.prisma.categoria.findMany({
      where: { restauranteId },
      orderBy: { nombre: 'asc' },
    });
  }

  findById(id: string, restauranteId: string): Promise<Categoria | null> {
    return this.prisma.categoria.findFirst({ where: { id, restauranteId } });
  }

  async update(
    id: string,
    restauranteId: string,
    data: Prisma.CategoriaUpdateInput,
  ): Promise<Categoria | null> {
    const { count } = await this.prisma.categoria.updateMany({
      where: { id, restauranteId },
      data,
    });

    if (count === 0) {
      return null;
    }

    return this.prisma.categoria.findUnique({ where: { id } });
  }

  async remove(id: string, restauranteId: string): Promise<boolean> {
    const { count } = await this.prisma.categoria.deleteMany({
      where: { id, restauranteId },
    });
    return count > 0;
  }
}
