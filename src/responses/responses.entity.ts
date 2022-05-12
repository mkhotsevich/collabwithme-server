import { Collaboration } from 'src/collaborations/collaborations.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  explanation: string;

  @Column()
  userId: number;

  @Column()
  collaborationId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Collaboration)
  collaboration: Collaboration;
}
