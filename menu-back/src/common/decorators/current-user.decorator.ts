import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../../auth/jwt-payload.interface';

/**
 * Devuelve el payload completo del JWT del usuario autenticado.
 * Requiere que el endpoint esté protegido con JwtAuthGuard.
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: JwtPayload }>();

    if (!request.user) {
      throw new UnauthorizedException('No se pudo determinar el usuario autenticado');
    }

    return request.user;
  },
);
