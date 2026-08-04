import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';

export class QueryPlatoDto {
  @IsOptional()
  @IsUUID()
  categoriaId?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  disponible?: boolean;
}
