import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
