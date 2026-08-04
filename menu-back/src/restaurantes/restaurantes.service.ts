import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantesRepository } from './restaurantes.repository';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

@Injectable()
export class RestaurantesService {
  constructor(private readonly restaurantesRepository: RestaurantesRepository) {}

  async findMiRestaurante(restauranteId: string) {
    const restaurante = await this.restaurantesRepository.findById(restauranteId);

    if (!restaurante) {
      throw new NotFoundException('No se encontró tu restaurante');
    }

    return restaurante;
  }

  updateMiRestaurante(restauranteId: string, dto: UpdateRestauranteDto) {
    return this.restaurantesRepository.update(restauranteId, dto);
  }
}
