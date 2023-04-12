import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Cart from "../entities/Cart";
import CartEntry from "../entities/CartEntry";
import ProductVariant from "../entities/ProductVariant";

export const createCart = async (req: Request, res: Response) => {
  const { quantityInCart, pricePerEntry, totalPriceEntry } = req.body;
  const selectedVariantId = req.body.productVariant;
  const cartId = req.body.cartId;

  try {
    const variant = await AppDataSource.getRepository(ProductVariant).findOne({
      where: { id: selectedVariantId },
      relations: ["product"],
    });

    const existingCartEntry = await AppDataSource.getRepository(
      CartEntry
    ).findOne({
      where: { productVariant: { id: variant.id }, cart: { id: cartId } },
    });

    if (existingCartEntry) {
      existingCartEntry.quantityInCart += quantityInCart;
      existingCartEntry.totalPriceEntry += totalPriceEntry;
      await AppDataSource.getRepository(CartEntry).save(existingCartEntry);
      return res.json(existingCartEntry);
    }

    const variantInCart = AppDataSource.getRepository(CartEntry).create({
      quantityInCart,
      pricePerEntry,
      totalPriceEntry,
      productVariant: variant,
      cart: cartId,
    });

    const result = await variantInCart.save();

    const cart = await AppDataSource.getRepository(Cart).findOne({
      where: { id: cartId },
      relations: ["cartEntries"],
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.cartEntries.push(variantInCart);
    await AppDataSource.getRepository(Cart).save(cart);

    return res.json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCartEntriesByCartId = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({
      where: { id: req.params.cartId },
      relations: ["cartEntries"],
    });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    return res.json(cart.cartEntries);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteCartEntry = async (req: Request, res: Response) => {
  const { cartEntryId } = req.params;
  try {
    const cartEntry = await AppDataSource.getRepository(CartEntry).findOne({
      where: {
        id: cartEntryId,
      },
      relations: ["productVariant"],
    });
    if (!cartEntry) {
      return res
        .status(404)
        .json(`Cart entry with id ${cartEntryId} does not exist`);
    }

    cartEntry.productVariant = null;

    await AppDataSource.getRepository(CartEntry).save(cartEntry);
    await AppDataSource.getRepository(CartEntry).delete(cartEntryId);

    return res.json("Cart entry deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductVariantByCartEntryId = async (
  req: Request,
  res: Response
) => {
  try {
    const productVariant = await ProductVariant.findOne({
      where: { cartEntry: { id: req.params.cartEntryId } },
      relations: ["cartEntry", "productAttributeValues.productAttribute"],
    });
    if (!productVariant) {
      return res.status(404).json({ message: "Product variant not found" });
    }
    return res.json(productVariant);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCartTotalSum = async (req: Request, res: Response) => {
  const { cartId } = req.params;

  try {
    const cartRepository = AppDataSource.getRepository(Cart);
    const cart = await cartRepository.findOne({
      where: { id: cartId },
      relations: ["cartEntries"],
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartTotalSum = cart.cartEntries.reduce(
      (sum, entry) => sum + entry.totalPriceEntry,
      0
    );

    cart.totalSum = cartTotalSum;

    await cartRepository.save(cart);

    return res.json({ totalSum: cartTotalSum });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCartEntryById = async (req: Request, res: Response) => {
  const cartEntryId = req.params.cartEntryId;
  try {
    const cartEntry = await CartEntry.findOne({
      where: { id: cartEntryId },
      relations: ["productVariant"],
    });

    if (!cartEntry) {
      return res.status(404).json({ message: "CartEntry not found" });
    }

    return res.json(cartEntry);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  createCart,
  getCartEntriesByCartId,
  getProductVariantByCartEntryId,
  getCartTotalSum,
  deleteCartEntry,
  getCartEntryById,
};
