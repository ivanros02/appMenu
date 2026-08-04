import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Etiqueta, Prisma } from '../../generated/prisma/client';

@Injectable()
export class EtiquetasRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(restauranteId: string, data: Prisma.EtiquetaCreateWithoutRestauranteInput): Promise<Etiqueta> {
    return this.prisma.etiqueta.create({
      data: {
        ...data,
        restaurante: { connect: { id: restauranteId } },
      },
    });
  }

  findAll(restauranteId: string): Promise<Etiqueta[]> {
    return this.prisma.etiqueta.findMany({
      where: { restauranteId },
      orderBy: { nombre: 'asc' },
    });
  }

  findById(id: string, restauranteId: string): Promise<Etiqueta | null> {
    return this.prisma.etiqueta.findFirst({ where: { id, restauranteId } });
  }

  async update(
    id: string,
    restauranteId: string,
    data: Prisma.EtiquetaUpdateInput,
  ): Promise<Etiqueta | null> {
    const { count } = await this.prisma.etiqueta.updateMany({
      where: { id, restauranteId },
      data,
    });

    if (count === 0) {
      return null;
    }

    return this.prisma.etiqueta.findUnique({ where: { id } });
  }

  async remove(id: string, restauranteId: string): Promise<boolean> {
    const { count } = await this.prisma.etiqueta.deleteMany({
      where: { id, restauranteId },
    });
    return count > 0;
  }

  async countByIdsAndRestaurante(ids: string[], restauranteId: string): Promise<number> {
    return this.prisma.etiqueta.count({
      where: { id: { in: ids }, restauranteId },
    });
  }

  async tienePlatosAsociados(id: string): Promise<boolean> {
    const count = await this.prisma.plato.count({
      where: { etiquetas: { some: { id } } },
    });
    return count > 0;
  }
}
