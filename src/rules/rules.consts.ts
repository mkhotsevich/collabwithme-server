import { Rule } from './rules.entity';

export const initialRules: Rule[] = [
  {
    id: 1,
    name: 'Добавление социальной сети',
  },
  {
    id: 2,
    name: 'Удаление социальной сети',
  },
  {
    id: 3,
    name: 'Редактирование социальной сети',
  },
];

export const userRules = initialRules.filter((rule) => rule.id === 1);
export const moderatorRules = initialRules.filter((rule) => rule.id === 2);
export const adminRules = initialRules.filter((rule) => rule.id === 3);

export const freeRules = initialRules.filter((rule) => rule.id === 1);
export const standardRules = initialRules.filter((rule) => rule.id === 1);
export const premiumRules = initialRules;
