export class SignInDto {
  readonly email: string;
  readonly password: string;
}

export class SignUpDto {
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
}
