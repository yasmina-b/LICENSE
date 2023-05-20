import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import { Like } from "typeorm";
import Subcategory from "../entities/Subcategory";
import Product from "../entities/Product";
import ProductAttributeValue from "../entities/ProductAttributeValue";
import Category from "../entities/Category";
import ProductVariant from "../entities/ProductVariant";

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

export const getProductByImageURL = async (req: Request, res: Response) => {
  try {
    const searchString = req.query.searchString;
    
    const product = await AppDataSource.getRepository(Product).findOne({
      where: {
        firstImageURL: Like(`%${searchString}%`),
      },
      relations: [
        "subcategory",
        "productVariants",
        "productVariants.productAttributeValues",
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getRelatedProducts = async (req: Request, res: Response) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const productId = req.params.productId;

    const relatedProducts = await AppDataSource.getRepository(Product)
      .createQueryBuilder("product")
      .where(
        "product.subcategory = :subcategoryId AND product.id != :productId",
        { subcategoryId, productId }
      )
      .leftJoinAndSelect("product.subcategory", "subcategory")
      .take(4)
      .getMany();

    return res.json(relatedProducts);
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
      relations: [
        "products",
        "productAttributes",
        "productAttributes.productAttributeValues",
      ],
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
      relations: [
        "subcategories",
        "subcategories.products",
        "subcategories.products.productVariants",
        "subcategories.products.productVariants.productAttributeValues",
      ],
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

export const getProductsFromFirstCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: {},
      order: { id: "ASC" },
      relations: ["subcategories", "subcategories.products"],
    });
    const subcategories = category ? category.subcategories : [];
    const productsList = subcategories.flatMap(
      (subcategory) => subcategory.products
    );

    return res.json(productsList);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductsFromLastCategory = async (
  req: Request,
  res: Response
) => {
  try {
    const category = await AppDataSource.getRepository(Category).findOne({
      where: {},
      order: { id: "DESC" },
      relations: ["subcategories", "subcategories.products"],
    });
    const subcategories = category ? category.subcategories : [];
    const productsList = subcategories.flatMap(
      (subcategory) => subcategory.products
    );

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
    if (!tkUser.isAdmin) {
      return res.status(401).json("You are not authorized to create products");
    }
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
    if (!tkUser.isAdmin) {
      return res.status(401).json("You are not authorized to delete products");
    }

    const product = await AppDataSource.getRepository(Product).findOne({
      where: {
        id: productId,
      },
      relations: ["productVariants"],
    });

    if (!product) {
      return res
        .status(404)
        .json(`Product with id ${productId} does not exist`);
    }

    await AppDataSource.getRepository(ProductVariant).remove(
      product.productVariants
    );
    await AppDataSource.getRepository(Product).remove(product);

    return res.json("Product deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getTotalWomenProducts = async (req: Request, res: Response) => {
  try {
    const womenCategory = await AppDataSource.getRepository(Category).findOne({
      where: { name: "Women" },
      relations: ["subcategories", "subcategories.products"],
    });
    let totalWomenProducts = 0;
    if (womenCategory && womenCategory.subcategories) {
      womenCategory.subcategories.forEach((subcat) => {
        totalWomenProducts += subcat.products.length;
      });
    }
    return res.json({ totalWomenProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getTotalMenProducts = async (req: Request, res: Response) => {
  try {
    const menCategory = await AppDataSource.getRepository(Category).findOne({
      where: { name: "Men" },
      relations: ["subcategories", "subcategories.products"],
    });
    let totalMenProducts = 0;
    if (menCategory && menCategory.subcategories) {
      menCategory.subcategories.forEach((subcat) => {
        totalMenProducts += subcat.products.length;
      });
    }
    return res.json({ totalMenProducts });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllProducts,
  getProductByImageURL,
  getRelatedProducts,
  getProductsBySubcategoryId,
  getProductsByCategoryId,
  getProductAttributeValuesByProductId,
  getProductByProductId,
  getProductsFromFirstCategory,
  getProductsFromLastCategory,
  createProduct,
  deleteProduct,
  getTotalWomenProducts,
  getTotalMenProducts,
};
