import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Cart from "./Cart";

@Entity({ name: "cart_entry" })
export default class CartEntry extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column()
  pricePerEntry: number;

  @Column()
  totalPriceEntry: number;

  @ManyToOne(() => Cart, (cart) => cart, { eager: true })
  cart: Cart;
}
