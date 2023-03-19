import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import ProductAttribute from "../entities/ProductAttribute";
import ProductAttributeValue from "../entities/ProductAttributeValue";

export const getAllProductAttributeValues = async (
  req: Request,
  res: Response
) => {
  try {
    const productAttributeValues = await AppDataSource.getRepository(
      ProductAttributeValue
    ).find();
    return res.json(productAttributeValues);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createProductAttributeValue = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { value } = req.body;
  const { tkUser } = req;
  const { productAttributeId } = req.params;

  try {
    // if (!tkUser.isAdmin) {
    //   return res
    //     .status(401)
    //     .json("You are not authorized to create product attribute values!");
    // }
    const productAttribute = await AppDataSource.getRepository(
      ProductAttribute
    ).findOne({
      where: {
        id: productAttributeId,
      },
    });

    if (!productAttribute) {
      return res
        .status(400)
        .json(`Product attribute with id ${productAttributeId} does not exist`);
    }

    const productAttributeValue = AppDataSource.getRepository(
      ProductAttributeValue
    ).create({
      value,
      productAttribute,
    });
    const result = await productAttributeValue.save();

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllProductAttributeValues,
  createProductAttributeValue,
};