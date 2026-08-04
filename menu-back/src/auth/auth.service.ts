import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosRepository } from '../usuarios/usuarios.repository';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from './jwt-payload.interface';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosRepository: UsuariosRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ accessToken: string }> {
    const usuario = await this.usuariosRepository.findByUsername(dto.username);

    // Mismo mensaje exista o no el usuario, para no filtrar qué usernames existen.
    if (!usuario || !(await bcrypt.compare(dto.password, usuario.passwordHash))) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    const payload: JwtPayload = {
      sub: usuario.id,
      username: usuario.username,
      restauranteId: usuario.restauranteId,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }

  async changePassword(usuarioId: string, dto: ChangePasswordDto): Promise<{ mensaje: string }> {
    const usuario = await this.usuariosRepository.findById(usuarioId);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const actualEsValida = await bcrypt.compare(dto.currentPassword, usuario.passwordHash);
    if (!actualEsValida) {
      throw new BadRequestException('La contraseña actual no es correcta');
    }

    const nuevoHash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);
    await this.usuariosRepository.updatePassword(usuarioId, nuevoHash);

    return { mensaje: 'Contraseña actualizada correctamente' };
  }
}
