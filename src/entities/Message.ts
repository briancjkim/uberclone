import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import User from './User';
import Chat from './Chat';

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;
  @ManyToOne(type => User, user => user.messages)
  user: User;
  @CreateDateColumn()
  createAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
export default Message;