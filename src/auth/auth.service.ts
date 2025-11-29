import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    const token = await this.generateToken(user.id, user.email);
    return {
      accessToken: token,
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmailWithPassword(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const safeUser = this.userService.toPublicUser(user);
    const token = await this.generateToken(user.id, user.email);

    return {
      accessToken: token,
      user: safeUser,
    };
  }

  private generateToken(userId: number, email: string) {
    return this.jwtService.signAsync({
      sub: userId,
      email,
    });
  }
}

