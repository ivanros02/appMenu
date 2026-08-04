import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { EtiquetasRepository } from './etiquetas.repository';
import { CreateEtiquetaDto } from './dto/create-etiqueta.dto';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';
import { Etiqueta } from '../../generated/prisma/client';

@Injectable()
export class EtiquetasService {
  constructor(private readonly etiquetasRepository: EtiquetasRepository) {}

  create(restauranteId: string, dto: CreateEtiquetaDto): Promise<Etiqueta> {
    return this.etiquetasRepository.create(restauranteId, dto);
  }

  findAll(restauranteId: string): Promise<Etiqueta[]> {
    return this.etiquetasRepository.findAll(restauranteId);
  }

  async findOne(restauranteId: string, id: string): Promise<Etiqueta> {
    const etiqueta = await this.etiquetasRepository.findById(id, restauranteId);

    if (!etiqueta) {
      throw new NotFoundException(`La etiqueta ${id} no existe en tu restaurante`);
    }

    return etiqueta;
  }

  async update(restauranteId: string, id: string, dto: UpdateEtiquetaDto): Promise<Etiqueta> {
    const etiqueta = await this.etiquetasRepository.update(id, restauranteId, dto);

    if (!etiqueta) {
      throw new NotFoundException(`La etiqueta ${id} no existe en tu restaurante`);
    }

    return etiqueta;
  }

  async remove(restauranteId: string, id: string): Promise<void> {
    const etiqueta = await this.etiquetasRepository.findById(id, restauranteId);

    if (!etiqueta) {
      throw new NotFoundException(`La etiqueta ${id} no existe en tu restaurante`);
    }

    const enUso = await this.etiquetasRepository.tienePlatosAsociados(id);

    if (enUso) {
      throw new ConflictException(
        'No podés eliminar una etiqueta que todavía tiene platos asociados',
      );
    }

    await this.etiquetasRepository.remove(id, restauranteId);
  }
}
