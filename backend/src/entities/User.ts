import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcrypt = require("bcrypt");
import Address from "./Address";
import Cart from "./Cart";
import Order from "./Order";

@Entity({ name: "user" })
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsEmail(undefined, { message: "Must be a valid email" })
  @Length(1, 255, { message: "Must not be empty" })
  @Column({ unique: true })
  email: string;

  @Length(1, 255, { message: "Must not be empty" })
  @Column()
  firstName: string;

  @Length(1, 255, { message: "Must not be empty" })
  @Column()
  lastName: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Length(6, 24, { message: "Must be at least 6 characters long" })
  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @ManyToOne(() => Address, (address) => address, { eager: true })
  address: Address;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}
