import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlatosModule } from './platos/platos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { EtiquetasModule } from './etiquetas/etiquetas.module';
import { PublicModule } from './public/public.module';
import { RestaurantesModule } from './restaurantes/restaurantes.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PlatosModule,
    CategoriasModule,
    EtiquetasModule,
    PublicModule,
    RestaurantesModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
