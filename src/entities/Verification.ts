import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { verificationTarget } from '../types/types';

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number
  @Column({ type: "text" })
  target: string;
  @Column({ type: "text" })
  payload: string;
  @Column({ type: "text", enum: ["PHONE", "EMAIL"] })
  key: verificationTarget;

  @Column({ type: "boolean", default: false })
  used: boolean;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}
export default Verification;