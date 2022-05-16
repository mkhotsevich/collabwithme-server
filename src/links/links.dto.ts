export class CreateLinkDto {
  userId: number;
  networkId: number;
  link: string;
}

export class UpdateLinkDto {
  link: string;
}
