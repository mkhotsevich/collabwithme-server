import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Network {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
