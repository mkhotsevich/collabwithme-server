import { Link } from 'src/links/links.entity';
import { Role } from 'src/roles/roles.entity';
import { RolesService } from 'src/roles/roles.service';
import { Subscription } from 'src/subscriptions/subscriptions.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  gender: string;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => Subscription)
  subscription: Subscription;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];
}
