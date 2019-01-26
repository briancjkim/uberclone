import { BaseEntity, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column } from 'typeorm';
import User from './User';
import Chat from './Chat';

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: "text" })
  text: string
  @Column({ nullable: true })
  chatId: number;
  @Column({ nullable: true })
  userId: number;
  @ManyToOne(type => Chat, chat => chat.messages)
  chat: Chat;
  @ManyToOne(type => User, user => user.messages)
  user: User;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;
}
export default Message;