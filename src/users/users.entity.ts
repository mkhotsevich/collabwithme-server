import { Link } from 'src/links/links.entity';
import { Role } from 'src/roles/roles.entity';
import { Subscription } from 'src/subscriptions/subscriptions.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export type UserGender = 'Мужской' | 'Женский' | 'Не указан';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: ['Мужской', 'Женский', 'Не указан'],
    default: 'Не указан',
  })
  gender: UserGender;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => Subscription)
  subscription: Subscription;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];
}
