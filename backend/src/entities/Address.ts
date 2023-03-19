import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Order from "./Order";
import User from "./User";

@Entity({ name: "address" })
export default class Address extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  streetNumber: number;

  @Column()
  addressLine1: string;

  @Column()
  addressLine2: string;

  @Column()
  city: string;

  @Column()
  county: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @OneToMany(() => User, (user) => user.address)
  users: User[];

  @OneToOne(() => Order, (order) => order.shippingAddress)
  order: Order;
}
