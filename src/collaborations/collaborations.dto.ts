export class CreateCollaborationDto {
  readonly name: string;
  readonly description: string;
  readonly userId: number;
  readonly categoryIds: number[];
  readonly networkIds: number[];
}

export class UpdateCollaborationDto {
  readonly name: string;
  readonly description: string;
  readonly categoryIds: number[];
  readonly networkIds: number[];
}
