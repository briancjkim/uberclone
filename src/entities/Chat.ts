import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import User from './User';
import Message from './Message';


@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @ManyToOne(type => User, user => user.chat)
  participants: User[];

  @CreateDateColumn()
  createAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
export default Chat;