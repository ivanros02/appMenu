import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class UpdateRestauranteDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  nombre?: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(120)
  horarioTexto?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;

  @IsOptional()
  @IsUrl()
  googleMapsUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  wifiNombre?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  wifiPassword?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string;

  @IsOptional()
  @IsUrl()
  instagramUrl?: string;

  @IsOptional()
  @IsUrl()
  tiktokUrl?: string;
}
