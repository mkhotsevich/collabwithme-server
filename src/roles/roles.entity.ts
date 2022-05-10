import { Rule } from 'src/rules/rules.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

export type RoleName = 'USER' | 'MODERATOR' | 'ADMIN';

@Entity()
export class Role {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'enum', enum: ['USER', 'MODERATOR', 'ADMIN'], unique: true })
  name: RoleName;

  @ManyToMany(() => Rule)
  @JoinTable()
  rules: Rule[];
}
