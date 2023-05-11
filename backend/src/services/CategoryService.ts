import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import Category from "../entities/Category";
import Subcategory from "../entities/Subcategory";
import Product from "../entities/Product";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await AppDataSource.getRepository(Category).find({
      relations: ["subcategories", "subcategories.products"],
      order: {
        name: "DESC",
      },
    });
    return res.json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getCategoryByCategoryId = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;

    const category = await AppDataSource.getRepository(Category).find({
      where: { id: categoryId },
    });

    return res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name, imageURL, description } = req.body;
  const { tkUser } = req;

  if (!tkUser.isAdmin)
    return res
      .status(401)
      .json("You are not authenticaded to create a category");
  try {
    const category = AppDataSource.getRepository(Category).create({
      name,
      imageURL,
      description,
    });
    const result = await category.save();
    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { categoryId } = req.params;
  const { tkUser } = req;

  try {
    if (!tkUser.isAdmin) {
      return res.status(401).json("You are not authorized to delete categories");
    }

    const category = await AppDataSource.getRepository(Category).findOne({
      where: {
        id: categoryId,
      },
      relations: ["subcategories"],
    });

    if (!category) {
      return res
        .status(404)
        .json(`Product with id ${categoryId} does not exist`);
    }

    await AppDataSource.getRepository(Subcategory).remove(
      category.subcategories
    );
    await AppDataSource.getRepository(Category).remove(category);

    return res.json("Category deleted successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllCategories,
  getCategoryByCategoryId,
  createCategory,
  deleteCategory,
};
