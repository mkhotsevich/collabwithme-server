import { User, UserGender, UserRole } from '../users.entity';

export class UpdateUserDto implements User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: UserGender;
  role: UserRole;
}
