import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Cart from "../entities/Cart";
import CartEntry from "../entities/CartEntry";
import Order from "../entities/Order";
import User from "../entities/User";

export const createOrder = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phoneNumber, address, city, postalCode } =
    req.body;
  const userId = req.body.userId;
  const cartId = req.body.cartId;

  const cartRepository = AppDataSource.getRepository(Cart);
  const cart = await cartRepository.findOne({
    where: { id: cartId },
    relations: ["orders", "cartEntries"],
  });

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["orders"],
  });

  try {
    const order = AppDataSource.getRepository(Order).create({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      postalCode,
      user: userId,
      cart: cartId
    });

    const result = await order.save();

    const entries = cart.cartEntries.map((entry) => {
      entry.productVariant = null;
      return entry;
    });

    await AppDataSource.getRepository(CartEntry).save(entries);

    const deleteResult = await AppDataSource.getRepository(CartEntry)
      .createQueryBuilder()
      .delete()
      .from(CartEntry)
      .where("cartId = :cartId", { cartId: cart.id })
      .execute();

    // Check if any rows were affected
    if (deleteResult.affected === 0) {
      throw new Error(`No cart entries found for cart with id ${cart.id}`);
    }

    // Update cart with new totalSum and empty entries
    cart.totalSum = 0;
    cart.cartEntries = [];
    await cartRepository.save(cart);


    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};



module.exports = {
  createOrder,
};
