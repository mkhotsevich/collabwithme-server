import { freeRules, premiumRules, standardRules } from 'src/rules/rules.consts';
import { Subscription } from './subscriptions.entity';

export const initialSubscriptions: Subscription[] = [
  {
    id: 1,
    name: 'FREE',
    rules: freeRules,
  },
  {
    id: 2,
    name: 'STANDARD',
    rules: standardRules,
  },
  {
    id: 3,
    name: 'PREMIUM',
    rules: premiumRules,
  },
];
