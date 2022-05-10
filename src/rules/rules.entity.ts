import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Rule {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
