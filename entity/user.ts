import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, default: false })
  active: boolean;

  @Column({ nullable: false, default: 1 })
  userRole: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: true, default: "now()" })
  dateBirth: Date;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  secondPhone: string;

  @Column({ nullable: true })
  businessTitle: string;

  @Column({ nullable: true })
  timeType: number;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  apartment: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  zipCode: string;

  @Column({ nullable: true, default: "now()" })
  hireDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ nullable: true })
  deleteBy: string;
}
