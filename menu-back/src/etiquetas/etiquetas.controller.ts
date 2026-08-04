import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestauranteId } from '../common/decorators/restaurante-id.decorator';
import { EtiquetasService } from './etiquetas.service';
import { CreateEtiquetaDto } from './dto/create-etiqueta.dto';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';

@UseGuards(JwtAuthGuard)
@Controller('etiquetas')
export class EtiquetasController {
  constructor(private readonly etiquetasService: EtiquetasService) {}

  @Post()
  create(@RestauranteId() restauranteId: string, @Body() dto: CreateEtiquetaDto) {
    return this.etiquetasService.create(restauranteId, dto);
  }

  @Get()
  findAll(@RestauranteId() restauranteId: string) {
    return this.etiquetasService.findAll(restauranteId);
  }

  @Get(':id')
  findOne(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.etiquetasService.findOne(restauranteId, id);
  }

  @Patch(':id')
  update(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEtiquetaDto,
  ) {
    return this.etiquetasService.update(restauranteId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.etiquetasService.remove(restauranteId, id);
  }
}
