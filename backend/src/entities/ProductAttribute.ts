import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import ProductAttributeValue from "./ProductAttributeValue";
import Subcategory from "./Subcategory";

@Entity({ name: "product_attribute" })
export default class ProductAttribute extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(
    () => Subcategory,
    (subcategory) => subcategory.productAttributes,
    {
      eager: true,
    }
  )
  subcategory: Subcategory;

  @OneToMany(
    () => ProductAttributeValue,
    (productAttributeValue) => productAttributeValue.productAttribute
  )
  productAttributeValues: ProductAttributeValue[];
}
