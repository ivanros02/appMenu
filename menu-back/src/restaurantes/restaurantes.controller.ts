import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestauranteId } from '../common/decorators/restaurante-id.decorator';
import { RestaurantesService } from './restaurantes.service';
import { UpdateRestauranteDto } from './dto/update-restaurante.dto';

// No hay :id en las rutas a propósito: el restaurante a leer/editar sale
// siempre del JWT (RestauranteId), nunca de un parámetro que el cliente
// pueda manipular para tocar el restaurante de otro tenant.
@UseGuards(JwtAuthGuard)
@Controller('restaurantes')
export class RestaurantesController {
  constructor(private readonly restaurantesService: RestaurantesService) {}

  @Get('mi-restaurante')
  findMiRestaurante(@RestauranteId() restauranteId: string) {
    return this.restaurantesService.findMiRestaurante(restauranteId);
  }

  @Patch('mi-restaurante')
  updateMiRestaurante(
    @RestauranteId() restauranteId: string,
    @Body() dto: UpdateRestauranteDto,
  ) {
    return this.restaurantesService.updateMiRestaurante(restauranteId, dto);
  }
}
