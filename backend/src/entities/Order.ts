import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Cart from "./Cart";
import CartEntry from "./CartEntry";
import User from "./User";

@Entity({ name: "order" })
export default class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: String;

  @Column()
  lastName: String;

  @Column()
  email: String;

  @Column()
  phoneNumber: String;

  @Column()
  address: String;

  @Column()
  city: String;

  @Column()
  postalCode: String;

  @Column({ nullable: true })
  orderDate: Date;

  @Column({ nullable: true })
  totalOrderSum: number;

  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User;

  @ManyToOne(() => Cart, (cart) => cart, { eager: true })
  cart: Cart;

  @OneToMany(() => CartEntry, (entry) => entry.order, {cascade: true})
  @JoinColumn()
  cartEntries: CartEntry[];
}
