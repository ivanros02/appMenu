import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { QueryPlatoDto } from './dto/query-plato.dto';

const conEtiquetas = { include: { etiquetas: true } } satisfies Prisma.PlatoDefaultArgs;

export type PlatoConEtiquetas = Prisma.PlatoGetPayload<typeof conEtiquetas>;

@Injectable()
export class PlatosRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    restauranteId: string,
    data: Prisma.PlatoCreateWithoutRestauranteInput,
  ): Promise<PlatoConEtiquetas> {
    return this.prisma.plato.create({
      data: {
        ...data,
        restaurante: { connect: { id: restauranteId } },
      },
      ...conEtiquetas,
    });
  }

  findAll(restauranteId: string, filters: QueryPlatoDto): Promise<PlatoConEtiquetas[]> {
    return this.prisma.plato.findMany({
      where: {
        restauranteId,
        ...(filters.categoriaId ? { categoriaId: filters.categoriaId } : {}),
        ...(filters.disponible !== undefined ? { disponible: filters.disponible } : {}),
      },
      orderBy: { createdAt: 'desc' },
      ...conEtiquetas,
    });
  }

  findById(id: string, restauranteId: string): Promise<PlatoConEtiquetas | null> {
    return this.prisma.plato.findFirst({ where: { id, restauranteId }, ...conEtiquetas });
  }

  async update(
    id: string,
    restauranteId: string,
    data: Prisma.PlatoUncheckedUpdateManyInput,
    etiquetaIds?: string[],
  ): Promise<PlatoConEtiquetas | null> {
    const { count } = await this.prisma.plato.updateMany({
      where: { id, restauranteId },
      data,
    });

    if (count === 0) {
      return null;
    }

    if (etiquetaIds !== undefined) {
      await this.prisma.plato.update({
        where: { id },
        data: { etiquetas: { set: etiquetaIds.map((etiquetaId) => ({ id: etiquetaId })) } },
      });
    }

    return this.prisma.plato.findUnique({ where: { id }, ...conEtiquetas });
  }

  async remove(id: string, restauranteId: string): Promise<boolean> {
    const { count } = await this.prisma.plato.deleteMany({
      where: { id, restauranteId },
    });
    return count > 0;
  }

  async categoriaPerteneceARestaurante(
    categoriaId: string,
    restauranteId: string,
  ): Promise<boolean> {
    const categoria = await this.prisma.categoria.findFirst({
      where: { id: categoriaId, restauranteId },
      select: { id: true },
    });
    return categoria !== null;
  }

  async etiquetasPertenecenARestaurante(
    etiquetaIds: string[],
    restauranteId: string,
  ): Promise<boolean> {
    const count = await this.prisma.etiqueta.count({
      where: { id: { in: etiquetaIds }, restauranteId },
    });
    return count === etiquetaIds.length;
  }
}
