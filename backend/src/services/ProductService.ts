import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import Subcategory from "../entities/Subcategory";
import Product from "../entities/Product";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await AppDataSource.getRepository(Product).find({
      relations: ["subcategory", "productVariants"],
    });
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name, description, firstImageURL, secondImageURL } = req.body;
  const { tkUser } = req;
  const { subcategoryId } = req.params;

  try {
    // if (!tkUser.isAdmin) {
    //   return res
    //     .status(401)
    //     .json("You are not authorized to create products");
    // }
    const subcategory = await AppDataSource.getRepository(Subcategory).findOne({
      where: {
        id: subcategoryId,
      },
      relations: ["products"],
    });

    if (!subcategory) {
      return res
        .status(400)
        .json(`Subcategory with id ${subcategoryId} does not exist`);
    }

    const product = AppDataSource.getRepository(Product).create({
      name,
      description,
      firstImageURL,
      secondImageURL,
      subcategory,
    });

    await AppDataSource.getRepository(Product).save(product);
    subcategory.products.push(product);
    await AppDataSource.getRepository(Subcategory).save(subcategory);

    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { productId } = req.params;
  const { tkUser } = req;

  try {
    // if (!tkUser.isAdmin) {
    //   return res.status(401).json("You are not authorized to delete products");
    // }

    const product = await AppDataSource.getRepository(Product).findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res
        .status(404)
        .json(`Product with id ${productId} does not exist`);
    }

    await AppDataSource.getRepository(Product).delete(productId);

    return res.json("Product deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
};
