import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Cart from "../entities/Cart";
import CartEntry from "../entities/CartEntry";
import Order from "../entities/Order";
import User from "../entities/User";
import ProductVariant from "../entities/ProductVariant";
import { AuthenticatedRequest } from "../middleware/verifyToken";

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
      cartEntries: cart.cartEntries,
      orderDate: new Date(),
    });

    const productVariantRepository =
      AppDataSource.getRepository(ProductVariant);

    for (const cartEntry of cart.cartEntries) {
      const productVariant = cartEntry.productVariant;
      const newQuantityInStock =
        productVariant.quantityInStock - cartEntry.quantityInCart;
      productVariant.quantityInStock = newQuantityInStock;
      await productVariantRepository.save(productVariant);
    }

    order.cartEntries.push(...cart.cartEntries);

    const result = await order.save();

    cart.orders.push(order);

    const deleteResult = await AppDataSource.getRepository(CartEntry)
      .createQueryBuilder()
      .update(CartEntry)
      .set({ cart: null })
      .where("cartId = :cartId", { cartId: cart.id })
      .execute();

    if (deleteResult.affected === 0) {
      throw new Error(`No cart entries found for cart with id ${cart.id}`);
    }
    cart.totalSum = 0;
    cart.cartEntries = [];
    await cartRepository.save(cart);

    await cartRepository.save(cart);

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { tkUser } = req;
  try {
    if (!tkUser.isAdmin) {
      return res
        .status(401)
        .json("You are not authorized to see user's orders");
    }
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({
      relations: [
        "user",
        "cartEntries",
        "cartEntries.productVariant",
        "cartEntries.productVariant.productAttributeValues",
      ],
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
      relations: [
        "user",
        "cartEntries",
        "cartEntries.productVariant",
        "cartEntries.productVariant.productAttributeValues",
      ],
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
export const deleteOrder = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { orderId } = req.params;
  const { tkUser } = req;

  try {
    if (!tkUser.isAdmin) {
      return res.status(401).json("You are not authorized to delete orders");
    }

    const order = await AppDataSource.getRepository(Order).findOne({
      where: {
        id: orderId,
      },
      relations: ["cartEntries"],
    });

    if (!order) {
      return res
        .status(404)
        .json(`Order with id ${orderId} does not exist`);
    }

    await AppDataSource.getRepository(CartEntry).remove(order.cartEntries);
    await AppDataSource.getRepository(Order).remove(order);

    return res.json("Order deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getTotalEarnings = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { tkUser } = req;
  try {
    if (!tkUser.isAdmin) {
      return res.status(401).json("You are not authorized to see earnings!");
    }
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find();
    const totalEarnings = orders.reduce(
      (acc, order) => acc + order.totalOrderSum,
      0
    );
    return res.json(totalEarnings);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve total earnings" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrder,
  deleteOrder,
  getTotalEarnings,
};
