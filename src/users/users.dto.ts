import { UserGender } from './users.entity';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
}

export class UpdateUserDto {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
  readonly gender: UserGender;
}

export class UpdatePasswordDto {
  readonly currentPassword: string;
  readonly newPassword: string;
}
