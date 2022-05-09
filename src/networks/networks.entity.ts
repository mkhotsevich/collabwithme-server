import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'networks' })
export class Network {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
