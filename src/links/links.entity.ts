import { Network } from 'src/networks/networks.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  userId: number;

  @Column()
  networkId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Network)
  network: Network;
}
