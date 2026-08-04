import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';

// Sin JwtAuthGuard a propósito: esto lo consume cualquiera que escanee el QR
// de la mesa, sin login. Es la única parte de la API que es pública.
@Controller('public/restaurantes')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get(':slug/menu')
  getMenu(@Param('slug') slug: string) {
    return this.publicService.getMenuPorSlug(slug);
  }

  @Get(':slug/platos/:platoId')
  getPlato(@Param('slug') slug: string, @Param('platoId') platoId: string) {
    return this.publicService.getPlatoPorSlug(slug, platoId);
  }
}
