import * as bcrypt from "bcrypt";
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';



const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  phoneNumber: string;


  @Column({ type: 'boolean', default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: 'text' })
  profilePhoto: string;


  @Column({ type: "boolean", default: false })
  isDriving: boolean;
  @Column({ type: "boolean", default: false })
  isRiding: boolean;
  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  @Column({ type: 'double precision', default: 0 })
  lastLng: number;
  @Column({ type: 'double precision', default: 0 })
  lastLat: number;
  @Column({ type: 'double precision', default: 0 })
  lastOrientation: number;

  get FullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
    }
  }
  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
};

export default User;