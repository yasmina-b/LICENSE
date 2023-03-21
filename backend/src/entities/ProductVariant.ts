import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Product from "./Product";
import ProductAttributeValue from "./ProductAttributeValue";

@Entity({ name: "product_variant" })
export default class ProductVariant extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  quantity: number;

  @Column()
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
}
