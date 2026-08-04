import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicRepository } from './public.repository';

@Injectable()
export class PublicService {
  constructor(private readonly publicRepository: PublicRepository) {}

  async getMenuPorSlug(slug: string) {
    const menu = await this.publicRepository.findMenuPorSlug(slug);

    if (!menu) {
      throw new NotFoundException(`No existe ningún restaurante con slug "${slug}"`);
    }

    return menu;
  }

  async getPlatoPorSlug(slug: string, platoId: string) {
    const plato = await this.publicRepository.findPlatoPublicoPorSlug(slug, platoId);

    if (!plato) {
      throw new NotFoundException(`No se encontró el plato ${platoId}`);
    }

    return plato;
  }
}
