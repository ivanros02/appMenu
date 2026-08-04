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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@UseGuards(JwtAuthGuard)
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  create(@RestauranteId() restauranteId: string, @Body() dto: CreateCategoriaDto) {
    return this.categoriasService.create(restauranteId, dto);
  }

  @Get()
  findAll(@RestauranteId() restauranteId: string) {
    return this.categoriasService.findAll(restauranteId);
  }

  @Get(':id')
  findOne(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.categoriasService.findOne(restauranteId, id);
  }

  @Patch(':id')
  update(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.categoriasService.update(restauranteId, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @RestauranteId() restauranteId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.categoriasService.remove(restauranteId, id);
  }
}
