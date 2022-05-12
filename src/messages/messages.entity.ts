import { Room } from 'src/rooms/rooms.entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roomId: number;

  @Column()
  message: string;

  @CreateDateColumn()
  createdDate: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Room)
  room: Room;
}
