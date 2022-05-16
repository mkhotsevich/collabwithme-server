import { Category } from 'src/categories/categories.entity';
import { Network } from 'src/networks/networks.entity';
import { User } from 'src/users/users.entity';
import { Response } from 'src/responses/responses.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Collaboration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Network)
  @JoinTable()
  networks: Network[];

  @OneToMany(() => Response, (response) => response.collaboration)
  responses: Response[];
}
