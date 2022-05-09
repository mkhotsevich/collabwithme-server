import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rules' })
export class Rule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
