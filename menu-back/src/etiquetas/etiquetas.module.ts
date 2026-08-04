import { Module } from '@nestjs/common';
import { EtiquetasController } from './etiquetas.controller';
import { EtiquetasService } from './etiquetas.service';
import { EtiquetasRepository } from './etiquetas.repository';

@Module({
  controllers: [EtiquetasController],
  providers: [EtiquetasService, EtiquetasRepository],
})
export class EtiquetasModule {}
