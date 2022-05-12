export class CreateUserDto {
  readonly email: string;
  readonly password: string;
}

export class UpdateUserDto {
  readonly firstName: string;
  readonly lastName: string;
}
