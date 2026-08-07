import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RestauranteId } from '../common/decorators/restaurante-id.decorator';
import { UploadsService } from './uploads.service';

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('imagen')
  @UseInterceptors(
    FileInterceptor('archivo', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_BYTES },
      fileFilter: (_req, file, callback) => {
        if (!TIPOS_PERMITIDOS.includes(file.mimetype)) {
          callback(new BadRequestException('Formato de imagen no soportado (usá JPG, PNG, WEBP o GIF)'), false);
          return;
        }
        callback(null, true);
      },
    }),
  )
  async subirImagen(
    @UploadedFile() archivo: Express.Multer.File,
    @RestauranteId() restauranteId: string,
  ) {
    if (!archivo) {
      throw new BadRequestException('No se recibió ningún archivo');
    }

    const url = await this.uploadsService.subirImagen(archivo, restauranteId);
    return { url };
  }
}
