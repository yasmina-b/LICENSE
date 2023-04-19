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
    relations: ["orders", "cartEntries", "cartEntries.productVariant"],
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
      cart: cart,
      totalOrderSum: cart.totalSum,
      orderDate: new Date(),
    });

    const result = await order.save();

    cart.orders.push(order);

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

    if (deleteResult.affected === 0) {
      throw new Error(`No cart entries found for cart with id ${cart.id}`);
    }
    cart.totalSum = 0;
    cart.cartEntries = [];
    await cartRepository.save(cart);

    await cartRepository.save(cart); // save the cart with updated orders array

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({
      relations: ["user", "cartEntries"],
    });
    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const orders = await AppDataSource.getRepository(Order).find({
      where: { user: { id: userId } },
      relations: ["cart", "cartEntries"],
    });

    return res.json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getOrder = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  try {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({
      where: { id: orderId },
      relations: [
        "cart",
        "cart.cartEntries",
        "cart.cartEntries.productVariant",
      ],
    });

    if (!order) {
      return res
        .status(404)
        .json({ message: `Order with id ${orderId} not found` });
    }

    return res.json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrder,
};
