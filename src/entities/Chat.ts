import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, Column, OneToOne } from 'typeorm';
import User from './User';
import Message from './Message';
import Ride from './Ride';


@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(type => Message, message => message.chat, { nullable: true })
  messages: Message[];


  @Column({ nullable: true })
  passengerId: number;
  @ManyToOne(type => User, user => user.chatAsPassenger)
  passenger: User;

  @Column({ nullable: true })
  rideId: number;
  @OneToOne(type => Ride, ride => ride.chat)
  ride: Ride;

  @Column({ nullable: true })
  driverId: number;

  @ManyToOne(type => User, user => user.chatAsDriver)
  driver: User;

  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
export default Chat;