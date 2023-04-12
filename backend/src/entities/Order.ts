import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Cart from "./Cart";
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

  @ManyToOne(() => User, (user) => user, { eager: true })
  user: User;

  // @OneToOne(() => Cart)
  // @JoinColumn()
  // cart: Cart;

  @ManyToOne(() => Cart, (cart) => cart, { eager: true })
  cart: Cart;
}
