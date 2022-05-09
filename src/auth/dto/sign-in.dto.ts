import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsString({ message: 'Email должен быть строкой' })
  @IsEmail({}, { message: 'Введите корректный email' })
  email: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}
