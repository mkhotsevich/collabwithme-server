import { adminRules, moderatorRules, userRules } from 'src/rules/rules.consts';
import { Role } from './roles.entity';

export const initialRoles: Role[] = [
  {
    id: 1,
    name: 'USER',
    rules: userRules,
  },
  {
    id: 2,
    name: 'MODERATOR',
    rules: moderatorRules,
  },
  {
    id: 3,
    name: 'ADMIN',
    rules: adminRules,
  },
];
