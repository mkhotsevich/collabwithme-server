import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { SignInDto, SignUpDto } from './auth.dto';
import { AuthPayload } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const candidate = await this.usersService.getByEmail(dto.email);
    if (candidate) {
      throw new BadRequestException(
        'Пользователь с данным email уже существует',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 8);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload: AuthPayload = {
      email: user.email,
      id: user.id,
      role: user.role.name,
    };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser({ email, password }: SignInDto) {
    const user = await this.usersService.getByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Некорректный email или пароль');
    }

    const passwordEquals = await bcrypt.compare(password, user.password);
    if (!passwordEquals) {
      throw new UnauthorizedException('Некорректный email или пароль');
    }

    return user;
  }
}
