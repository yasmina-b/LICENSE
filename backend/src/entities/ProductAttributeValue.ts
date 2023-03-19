import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import ProductAttribute from "./ProductAttribute";
import ProductVariant from "./ProductVariant";

@Entity({ name: "product_attribute_value" })
export default class ProductAttributeValue extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @ManyToOne(
    () => ProductAttribute,
    (productAttribute) => productAttribute.productAttributeValues,
    {
      eager: true,
    }
  )
  productAttribute: ProductAttribute;

  @ManyToMany(
    () => ProductVariant,
    (productVariant) => productVariant.productAttributeValues
  )
  @JoinTable({
    name: "product_attribute_value_product_variant",
    joinColumn: {
      name: "productAttributeValueId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "productVariantId",
      referencedColumnName: "id",
    },
  })
  productVariants: ProductVariant[];
}
