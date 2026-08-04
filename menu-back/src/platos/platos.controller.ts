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
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestauranteId } from '../common/decorators/restaurante-id.decorator';
import { PlatosService } from './platos.service';
import { CreatePlatoDto } from './dto/create-plato.dto';
import { UpdatePlatoDto } from './dto/update-plato.dto';
import { QueryPlatoDto } from './dto/query-plato.dto';

@UseGuards(JwtAuthGuard)
@Controller('platos')
export class PlatosController {
  constructor(private readonly platosService: PlatosService) {}

  @Post()
  create(@RestauranteId() restauranteId: string, @Body() dto: CreatePlatoDto) {
    return this.platosService.create(restauranteId, dto);
  }

  @Get()
  findAll(@RestauranteId() restauranteId: string, @Query() query: QueryPlatoDto) {
    return this.platosService.findAll(restauranteId, query);
  }

  @Get(':id')
  findOne(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.platosService.findOne(restauranteId, id);
  }

  @Patch(':id')
  update(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePlatoDto,
  ) {
    return this.platosService.update(restauranteId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.platosService.remove(restauranteId, id);
  }
}
