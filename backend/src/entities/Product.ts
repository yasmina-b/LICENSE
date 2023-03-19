import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ProductVariant from "./ProductVariant";
import Subcategory from "./Subcategory";

@Entity({ name: "product" })
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  firstImageURL: string;

  @Column()
  secondImageURL: string;

  @ManyToOne(() => Subcategory, (subcategory) => subcategory.products, {
    eager: true,
  })
  subcategory: Subcategory;

  @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
  productVariants: ProductVariant[];
}
