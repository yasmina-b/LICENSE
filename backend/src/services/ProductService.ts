import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import Subcategory from "../entities/Subcategory";
import Product from "../entities/Product";
import ProductAttributeValue from "../entities/ProductAttributeValue";
import Category from "../entities/Category";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await AppDataSource.getRepository(Product).find({
      relations: [
        "subcategory",
        "productVariants",
        "productVariants.productAttributeValues",
      ],
    });
    return res.json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductByProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;

    const product = await AppDataSource.getRepository(Product).find({
      where: { id: productId },
    });

    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductAttributeValuesByProductId = async (
  req: Request,
  res: Response
) => {
  const productId = req.params.productId;

  try {
    const productAttributeValues = await AppDataSource.getRepository(
      ProductAttributeValue
    )
      .createQueryBuilder("pav")
      .leftJoin("pav.productVariants", "pv")
      .leftJoin("pv.product", "p")
      .where("p.id = :productId", { productId })
      .getMany();

    return res.json(productAttributeValues);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductsBySubcategoryId = async (
  req: Request,
  res: Response
) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    const products = await AppDataSource.getRepository(Subcategory).find({
      where: { id: subcategoryId },
      relations: ["products"],
      order: {
        name: "ASC",
      },
    });
    const productsList = products.length > 0 ? products[0].products : [];
    return res.json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductsByCategoryId = async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    const products = await AppDataSource.getRepository(Category).find({
      where: { id: categoryId },
      relations: ["subcategories", "subcategories.products"],
    });
    const subcategories = products.flatMap(
      (category) => category.subcategories
    );
    const productsList = subcategories.flatMap(
      (subcategory) => subcategory.products
    );

    return res.json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductsFromFirstCategory = async (req: Request, res: Response) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: {},
      order: { id: "ASC" },
      relations: ["subcategories", "subcategories.products"],
    });
    const subcategories = category ? category.subcategories : [];
    const productsList = subcategories.flatMap((subcategory) => subcategory.products);

    return res.json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductsFromLastCategory = async (req: Request, res: Response) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: {},
      order: { id: "DESC" },
      relations: ["subcategories", "subcategories.products"],
    });
    const subcategories = category ? category.subcategories : [];
    const productsList = subcategories.flatMap((subcategory) => subcategory.products);

    return res.json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name, description, price, firstImageURL, secondImageURL } = req.body;
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
      price,
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
  getProductsBySubcategoryId,
  getProductsByCategoryId,
  getProductAttributeValuesByProductId,
  getProductByProductId,
  getProductsFromFirstCategory,
  getProductsFromLastCategory,
  createProduct,
  deleteProduct,
};
