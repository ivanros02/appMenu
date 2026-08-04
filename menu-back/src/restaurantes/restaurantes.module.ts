import { Module } from '@nestjs/common';
import { RestaurantesController } from './restaurantes.controller';
import { RestaurantesService } from './restaurantes.service';
import { RestaurantesRepository } from './restaurantes.repository';

@Module({
  controllers: [RestaurantesController],
  providers: [RestaurantesService, RestaurantesRepository],
})
export class RestaurantesModule {}
