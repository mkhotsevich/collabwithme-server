import { Rule } from 'src/rules/rules.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

export type SubscriptionName = 'FREE' | 'STANDARD' | 'PREMIUM';

@Entity()
export class Subscription {
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['FREE', 'STANDARD', 'PREMIUM'],
  })
  name: SubscriptionName;

  @ManyToMany(() => Rule)
  @JoinTable()
  rules: Rule[];
}
