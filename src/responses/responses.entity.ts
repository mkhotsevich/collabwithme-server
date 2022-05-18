import { Collaboration } from 'src/collaborations/collaborations.entity';
import { User } from 'src/users/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export type ResponseStatus = 'sent' | 'accepted' | 'rejected';

@Entity()
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  explanation: string;

  @Column({
    type: 'enum',
    enum: ['sent', 'accepted', 'rejected'],
    default: 'sent',
  })
  status: ResponseStatus;

  @Column()
  userId: number;

  @Column()
  collaborationId: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Collaboration, (collaboration) => collaboration.id, {
    onDelete: 'CASCADE',
  })
  collaboration: Collaboration;
}
