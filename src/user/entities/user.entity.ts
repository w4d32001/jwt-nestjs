import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryColumn()
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column({ length: 50 })
  email: string;
  @Column({ type: 'text' })
  password: string;
}
