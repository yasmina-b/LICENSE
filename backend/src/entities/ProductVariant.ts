import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import CartEntry from "./CartEntry";
import Product from "./Product";
import ProductAttributeValue from "./ProductAttributeValue";

@Entity({ name: "product_variant" })
export default class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantityInStock: number;

  @Column({ nullable: true })
  addedDate: Date;

  @ManyToOne(() => Product, (product) => product, {
    eager: true,
  })
  product: Product;

  @ManyToMany(
    () => ProductAttributeValue,
    (productAttributeValue) => productAttributeValue.productVariants,
    { cascade: true }
  )
  productAttributeValues: ProductAttributeValue[];

  @OneToOne(() => CartEntry)
  @JoinColumn()
  cartEntry: CartEntry;
}
