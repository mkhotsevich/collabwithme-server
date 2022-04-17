import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignDto } from './dto/sign.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto: SignDto) {
    const candidate = await this.usersService.findByEmail(dto.email);

    if (candidate) {
      throw new BadRequestException('Пользователь с данным email существует');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 8);
    const user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async signIn(dto: SignDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(dto: SignDto) {
    const user = await this.usersService.findByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(
      dto.password,
      user?.password || '',
    );

    if (user && passwordEquals) return user;

    throw new UnauthorizedException('Некорректный email или пароль');
  }
}
