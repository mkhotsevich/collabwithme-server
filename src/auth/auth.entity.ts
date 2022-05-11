import { RoleName } from 'src/roles/roles.entity';

export class AuthPayload {
  email: string;
  id: number;
  role: RoleName;
}
