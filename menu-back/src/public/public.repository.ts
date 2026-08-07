import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PublicRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMenuPorSlug(slug: string) {
    return this.prisma.restaurante.findUnique({
      where: { slug },
      select: {
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
        colorFondo: true,
        colorTexto: true,
        categorias: {
          orderBy: { nombre: 'asc' },
          select: {
            id: true,
            nombre: true,
            platos: {
              where: { disponible: true },
              orderBy: { createdAt: 'desc' },
              select: {
                id: true,
                nombre: true,
                descripcion: true,
                precio: true,
                imagenUrl: true,
                etiquetas: { select: { id: true, nombre: true } },
                categoriaId: true,
              },
            },
          },
        },
      },
    });
  }

  // where con relación { restaurante: { slug } } en vez de buscar el
  // restaurante primero: si el plato existe pero es de OTRO restaurante,
  // esto da null igual que si no existiera — no hay forma de diferenciar
  // ambos casos desde afuera (mismo criterio anti-enumeración que el login).
  findPlatoPublicoPorSlug(slug: string, platoId: string) {
    return this.prisma.plato.findFirst({
      where: {
        id: platoId,
        disponible: true,
        restaurante: { slug },
      },
      select: {
        id: true,
        nombre: true,
        descripcion: true,
        precio: true,
        imagenUrl: true,
        etiquetas: { select: { id: true, nombre: true } },
        categoriaId: true,
        categoria: { select: { id: true, nombre: true } },
        restaurante: { select: { colorFondo: true, colorTexto: true } },
      },
    });
  }
}
