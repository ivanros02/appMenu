import { Module } from '@nestjs/common';
import { PlatosController } from './platos.controller';
import { PlatosService } from './platos.service';
import { PlatosRepository } from './platos.repository';

@Module({
  controllers: [PlatosController],
  providers: [PlatosService, PlatosRepository],
})
export class PlatosModule {}
