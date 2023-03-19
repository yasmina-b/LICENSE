import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Address from "./Address";
import Cart from "./Cart";
import User from "./User";

@Entity({ name: "order" })
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  total: number;

  @Column()
  orderDate: Date;

  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToOne(() => Address)
  @JoinColumn()
  shippingAddress: Address;
}
