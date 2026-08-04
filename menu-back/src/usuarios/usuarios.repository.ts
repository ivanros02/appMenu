import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario } from '../../generated/prisma/client';

@Injectable()
export class UsuariosRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByUsername(username: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { username } });
  }

  findById(id: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  updatePassword(id: string, passwordHash: string): Promise<Usuario> {
    return this.prisma.usuario.update({ where: { id }, data: { passwordHash } });
  }
}
