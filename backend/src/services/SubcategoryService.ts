import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import Category from "../entities/Category";
import Subcategory from "../entities/Subcategory";

export const getAllSubcategories = async (req: Request, res: Response) => {
  try {
    const subcategories = await AppDataSource.getRepository(Subcategory).find({
      relations: ["category", "products", "productAttributes"],
      order: {
        name: "ASC",
      },
    });
    return res.json(subcategories);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const createSubcategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { name, imageURL, description } = req.body;
  const { tkUser } = req;
  const { categoryId } = req.params;

  try {
    // if (!tkUser.isAdmin) {
    //   return res
    //     .status(401)
    //     .json("You are not authorized to create subcategories");
    // }
    const category = await AppDataSource.getRepository(Category).findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return res
        .status(400)
        .json(`Category with id ${categoryId} does not exist`);
    }

    const subcategory = AppDataSource.getRepository(Subcategory).create({
      name,
      imageURL,
      description,
      category
    });
    const result = await subcategory.save();

    return res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteSubcategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { tkUser } = req;
  const { subcategoryId } = req.params;

  try {
    const subcategory = await AppDataSource.getRepository(Subcategory).findOne({
      where: { id: subcategoryId },
      relations: ["category"],
    });

    if (!subcategory) {
      return res.status(404).json({ message: "Subcategory not found." });
    }

    // if (!tkUser.isAdmin) {
    //   return res.status(401).json({
    //     message: "You are not authorized to delete this subcategory.",
    //   });
    // }

    await AppDataSource.getRepository(Subcategory).remove(subcategory);

    return res.status(204).send();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = {
  getAllSubcategories,
  createSubcategory,
  deleteSubcategory,
};
