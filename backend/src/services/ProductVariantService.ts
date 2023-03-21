import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import Product from "../entities/Product";
import ProductVariant from "../entities/ProductVariant";
import ProductAttributeValue from "../entities/ProductAttributeValue";

export const getProductVariantsByProductId = async (
  req: Request,
  res: Response
) => {
  const productId = req.params.productId;

  try {
    const productVariants = await AppDataSource.getRepository(
      ProductVariant
    ).find({
      where: {
        product: {
          id: productId,
        },
      },
      relations: ["productAttributeValues"],
    });

    return res.json(productVariants);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductAttributeValuesByProductVariantId = async (
  req: Request,
  res: Response
) => {
  try {
    const productVariantId = req.params.productVariantId;

    const productAttributeValues = await AppDataSource.getRepository(
      ProductVariant
    ).find({
      where: { id: productVariantId },
      relations: ["productAttributeValues"],
    });
    const productAttributeValuesList =
      productAttributeValues.length > 0
        ? productAttributeValues[0].productAttributeValues
        : [];
    return res.json(productAttributeValuesList);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductVariantByProductVariantId = async (
  req: Request,
  res: Response
) => {
  const productVariantId = req.params.productVariantId;

  try {
    const productVariant = await AppDataSource.getRepository(
      ProductVariant
    ).find({
      where: {
        id: productVariantId,
      },
      relations: ["productAttributeValues"],
    });

    return res.json(productVariant);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getAllProductVariants = async (req: Request, res: Response) => {
  try {
    const productVariants = await AppDataSource.getRepository(
      ProductVariant
    ).find({ relations: ["productAttributeValues"] });
    return res.json(productVariants);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createProductVariant = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { quantity, price, addedDate } = req.body;
  const { tkUser } = req;
  const { productId } = req.params;
  const { productAttributeValueId } = req.body;

  try {
    // if (!tkUser.isAdmin) {
    //   return res
    //     .status(401)
    //     .json("You are not authorized to create product variants!");
    // }
    const product = await AppDataSource.getRepository(Product).findOne({
      where: {
        id: productId,
      },
    });

    const productAttributeValue = await AppDataSource.getRepository(
      ProductAttributeValue
    ).findOne({
      where: {
        id: productAttributeValueId,
      },
      relations: ["productVariants"],
    });

    if (!product) {
      return res
        .status(400)
        .json(`Product with id ${productId} does not exist`);
    }

    if (!productAttributeValue) {
      return res
        .status(400)
        .json(
          `Product attribute value with id ${productAttributeValueId} does not exist`
        );
    }

    const productVariant = AppDataSource.getRepository(ProductVariant).create({
      quantity,
      addedDate,
      product,
    });

    await AppDataSource.getRepository(ProductVariant).save(productVariant);
    productAttributeValue.productVariants.push(productVariant);
    await AppDataSource.getRepository(ProductAttributeValue).save(
      productAttributeValue
    );

    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getProductVariantsByProductId,
  getAllProductVariants,
  getProductVariantByProductVariantId,
  getProductAttributeValuesByProductVariantId,
  createProductVariant,
};
