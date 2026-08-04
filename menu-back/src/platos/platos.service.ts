import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PlatosRepository, PlatoConEtiquetas } from './platos.repository';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { QueryPlatoDto } from './dto/query-plato.dto';

@Injectable()
export class PlatosService {
  constructor(private readonly platosRepository: PlatosRepository) {}

  async create(restauranteId: string, dto: CreatePlatoDto): Promise<PlatoConEtiquetas> {
    await this.assertCategoriaValida(dto.categoriaId, restauranteId);

    if (dto.etiquetas) {
      await this.assertEtiquetasValidas(dto.etiquetas, restauranteId);
    }

    const { categoriaId, etiquetas, ...resto } = dto;

    return this.platosRepository.create(restauranteId, {
      ...resto,
      categoria: { connect: { id: categoriaId } },
      ...(etiquetas ? { etiquetas: { connect: etiquetas.map((id) => ({ id })) } } : {}),
    });
  }

  findAll(restauranteId: string, query: QueryPlatoDto): Promise<PlatoConEtiquetas[]> {
    return this.platosRepository.findAll(restauranteId, query);
  }

  async findOne(restauranteId: string, id: string): Promise<PlatoConEtiquetas> {
    const plato = await this.platosRepository.findById(id, restauranteId);

    if (!plato) {
      throw new NotFoundException(`El plato ${id} no existe en tu restaurante`);
    }

    return plato;
  }

  async update(restauranteId: string, id: string, dto: UpdatePlatoDto): Promise<PlatoConEtiquetas> {
    if (dto.categoriaId) {
      await this.assertCategoriaValida(dto.categoriaId, restauranteId);
    }

    if (dto.etiquetas) {
      await this.assertEtiquetasValidas(dto.etiquetas, restauranteId);
    }

    const { categoriaId, etiquetas, ...resto } = dto;

    const plato = await this.platosRepository.update(
      id,
      restauranteId,
      {
        ...resto,
        // updateMany no soporta la sintaxis de relación { connect }, solo
        // update() de un único registro la soporta — acá hay que setear el
        // campo escalar de la FK directamente.
        ...(categoriaId ? { categoriaId } : {}),
      },
      etiquetas,
    );

    if (!plato) {
      throw new NotFoundException(`El plato ${id} no existe en tu restaurante`);
    }

    return plato;
  }

  async remove(restauranteId: string, id: string): Promise<void> {
    const eliminado = await this.platosRepository.remove(id, restauranteId);

    if (!eliminado) {
      throw new NotFoundException(`El plato ${id} no existe en tu restaurante`);
    }
  }

  private async assertCategoriaValida(categoriaId: string, restauranteId: string): Promise<void> {
    const pertenece = await this.platosRepository.categoriaPerteneceARestaurante(
      categoriaId,
      restauranteId,
    );

    if (!pertenece) {
      throw new BadRequestException(
        'La categoría indicada no existe o no pertenece a tu restaurante',
      );
    }
  }

  private async assertEtiquetasValidas(etiquetaIds: string[], restauranteId: string): Promise<void> {
    const pertenecen = await this.platosRepository.etiquetasPertenecenARestaurante(
      etiquetaIds,
      restauranteId,
    );

    if (!pertenecen) {
      throw new BadRequestException(
        'Alguna de las etiquetas indicadas no existe o no pertenece a tu restaurante',
      );
    }
  }
}
