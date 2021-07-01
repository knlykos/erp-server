import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class Department {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false, default: true })
  active: boolean;

  @Column({ nullable: false, default: "" })
  name: string;

  @Column({ nullable: false, default: "" })
  description: string;

  @Column({ nullable: false, default: 0 })
  code: number;

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
