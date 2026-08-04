import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateEtiquetaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(60)
  nombre: string;
}
