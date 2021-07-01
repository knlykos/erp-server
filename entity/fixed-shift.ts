import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { Department } from "./department";

@Entity()
export class FixedShift {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: false, default: null })
  start: number;

  @Column({ nullable: false, default: null })
  end: number;

  // @Column({ nullable: false, default: null })
  // departmentId: string;

  // @Column("int", { array: true })
  // weekdays: number[];

  @Column({ nullable: false, default: null })
  monday: boolean;

  @Column({ nullable: false, default: null })
  tuesday: boolean;

  @Column({ nullable: false, default: null })
  wednesday: boolean;

  @Column({ nullable: false, default: null })
  thursday: boolean;

  @Column({ nullable: false, default: null })
  friday: boolean;

  @Column({ nullable: false, default: null })
  saturday: boolean;

  @Column({ nullable: false, default: null })
  sunday: boolean;

  @OneToOne(() => Department)
  @JoinColumn()
  department: Department;

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
