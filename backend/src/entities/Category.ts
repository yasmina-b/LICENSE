import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Subcategory from "./Subcategory";

@Entity({ name: "category" })
export default class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  imageURL: string;

  @Column()
  description: string;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];
}
