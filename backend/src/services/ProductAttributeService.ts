import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import Subcategory from "../entities/Subcategory";
import ProductAttribute from "../entities/ProductAttribute";

export const getAllProductAttributes = async (req: Request, res: Response) => {
  try {
    const productAttributes = await AppDataSource.getRepository(
      ProductAttribute
    ).find({
      relations: ["productAttributeValues"],
      order: {
        name: "ASC",
      },
    });
    return res.json(productAttributes);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createProductAttribute = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name } = req.body;
  const { tkUser } = req;
  const { subcategoryId } = req.params;

  try {
    // if (!tkUser.isAdmin) {
    //   return res
    //     .status(401)
    //     .json("You are not authorized to create product attributes!");
    // }
    const subcategory = await AppDataSource.getRepository(Subcategory).findOne({
      where: {
        id: subcategoryId,
      },
    });

    if (!subcategory) {
      return res
        .status(400)
        .json(`Subcategory with id ${subcategoryId} does not exist`);
    }

    const productAttribute = AppDataSource.getRepository(
      ProductAttribute
    ).create({
      name,
      subcategory,
    });
    const result = await productAttribute.save();

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllProductAttributes,
  createProductAttribute,
};
