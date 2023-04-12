import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CartEntry from "./CartEntry";
import Order from "./Order";
import User from "./User";

@Entity({ name: "cart" })
export default class Cart extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  totalSum: number;

  @OneToOne(() => User, (user) => user.cart)
  user: User;

  @OneToMany(() => CartEntry, (cartEntry) => cartEntry.cart)
  cartEntries: CartEntry[];

  // @OneToOne(() => Order, (order) => order.cart)
  // order: Order;
  @OneToMany(() => Order, (order) => order.cart)
  orders: Order[];
}
