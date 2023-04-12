import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Cart from "./Cart";
import ProductVariant from "./ProductVariant";

@Entity({ name: "cart_entry" })
export default class CartEntry extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantityInCart: number;

  @Column()
  pricePerEntry: number;

  @Column()
  totalPriceEntry: number;

  @ManyToOne(() => Cart, (cart) => cart, { eager: true })
  cart: Cart;

  @OneToOne(() => ProductVariant, (productVariant) => productVariant.cartEntry)
  productVariant: ProductVariant;
}
