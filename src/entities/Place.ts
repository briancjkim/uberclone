import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import User from './User';


@Entity()
class Place extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'text' })
  name: string
  @Column({ type: 'double precision', default: 0 })
  lat: number
  @Column({ type: 'double precision', default: 0 })
  lng: number
  @Column({ type: 'text' })
  address: string
  @Column({ type: 'boolean', default: false })
  isFav: boolean
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(type => User, user => user.places)
  user: User;

  @CreateDateColumn()
  createAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
export default Place;