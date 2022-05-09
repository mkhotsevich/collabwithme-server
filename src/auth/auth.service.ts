import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const candidate = await this.usersService.findByEmail(dto.email);

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
    const payload = { email: user.email, id: user.id, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: SignInDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(
      dto.password,
      user?.password || '',
    );

    if (user && passwordEquals) return user;

    throw new UnauthorizedException('Некорректный email или пароль');
  }
}
