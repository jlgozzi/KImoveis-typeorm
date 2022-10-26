import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Property } from "./properties.entity";
import { User } from "./user.entity";

@Entity("schedules_user_properties")
export class SchedulesUserProperty {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  hour: string;

  @ManyToOne((type) => Property, { eager: true })
  @JoinColumn()
  property: Property[];

  @ManyToOne((type) => User, { eager: true })
  @JoinColumn()
  user: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
