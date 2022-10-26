import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./address.entity";
import { Category } from "./categories.entity";

@Entity("properties")
export class Property {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  sold: boolean;

  @Column()
  value: number;

  @Column()
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @OneToOne((type) => Address, { eager: true })
  @JoinColumn()
  address: Address;

  @ManyToOne((type) => Category, { eager: true })
  @JoinColumn()
  category: Category;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }
}
