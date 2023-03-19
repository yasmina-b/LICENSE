import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./Category";
import Product from "./Product";
import ProductAttribute from "./ProductAttribute";

@Entity({ name: "subcategory" })
export default class Subcategory extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  imageURL: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category, { eager: true })
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategory)
  products: Product[];

  @OneToMany(() => ProductAttribute, (productAttribute) => productAttribute.subcategory)
  productAttributes: ProductAttribute[];
}
