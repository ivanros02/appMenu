import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../../auth/jwt-payload.interface';

/**
 * Extrae el restauranteId del usuario autenticado (inyectado por JwtStrategy).
 * Requiere que el endpoint esté protegido con JwtAuthGuard.
 */
export const RestauranteId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: JwtPayload }>();
    const restauranteId = request.user?.restauranteId;

    if (!restauranteId) {
      throw new UnauthorizedException('No se pudo determinar el restaurante del usuario');
    }

    return restauranteId;
  },
);
