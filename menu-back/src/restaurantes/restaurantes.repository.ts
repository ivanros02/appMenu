import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';

const SELECT_PERFIL = {
  id: true,
  nombre: true,
  slug: true,
  logoUrl: true,
  horarioTexto: true,
  direccion: true,
  googleMapsUrl: true,
  wifiNombre: true,
  wifiPassword: true,
  telefono: true,
  instagramUrl: true,
  tiktokUrl: true,
} satisfies Prisma.RestauranteSelect;

@Injectable()
export class RestaurantesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.restaurante.findUnique({ where: { id }, select: SELECT_PERFIL });
  }

  update(id: string, data: Prisma.RestauranteUpdateInput) {
    return this.prisma.restaurante.update({ where: { id }, data, select: SELECT_PERFIL });
  }
}
