import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import ProductAttribute from "../entities/ProductAttribute";
import ProductAttributeValue from "../entities/ProductAttributeValue";
import Subcategory from "../entities/Subcategory";
import ProductVariant from "../entities/ProductVariant";
import Product from "../entities/Product";
import Category from "../entities/Category";

export const getAllProductAttributeValues = async (
  req: Request,
  res: Response
) => {
  try {
    const productAttributeValues = await AppDataSource.getRepository(
      ProductAttributeValue
    ).find({
      relations: ["productVariants.productAttributeValues"],
    });
    return res.json(productAttributeValues);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductAttributeValuesBySubcategory = async (
  req: Request,
  res: Response
) => {
  try {
    const subcategoryId = req.params.subcategoryId;

    const subcategoryRepository = AppDataSource.getRepository(Subcategory);
    const subcategory = await subcategoryRepository.findOne({
      where: { id: subcategoryId },
      relations: [
        "productAttributes",
        "productAttributes.productAttributeValues",
        "products",
        "products.productVariants",
        "products.productVariants.productAttributeValues",
      ],
    });

    const productVariants = subcategory.products.reduce(
      (acc: ProductVariant[], product: Product) => {
        return acc.concat(product.productVariants);
      },
      []
    );

    const productAttributeValues = productVariants.reduce(
      (acc: ProductAttributeValue[], productVariant: ProductVariant) => {
        return acc.concat(productVariant.productAttributeValues);
      },
      []
    );

    const uniqueProductAttributeValues = Array.from(
      new Set(productAttributeValues.map((value) => value.id))
    ).map((id) => {
      return productAttributeValues.find((value) => value.id === id);
    });

    return res.json(uniqueProductAttributeValues);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductAttributeValuesByCategoryId = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;

    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id: categoryId },
      relations: [
        "subcategories",
        "subcategories.productAttributes",
        "subcategories.productAttributes.productAttributeValues",
        "subcategories.products",
        "subcategories.products.productVariants",
        "subcategories.products.productVariants.productAttributeValues",
      ],
    });

    const subcategoryProductAttributeValues = category.subcategories.reduce(
      (acc: ProductAttributeValue[], subcategory: Subcategory) => {
        return acc.concat(
          subcategory.productAttributes.reduce(
            (acc2: ProductAttributeValue[], productAttribute) => {
              return acc2.concat(productAttribute.productAttributeValues);
            },
            []
          )
        );
      },
      []
    );

    const productVariantAttributeValues = category.subcategories.reduce(
      (acc: ProductAttributeValue[], subcategory: Subcategory) => {
        return acc.concat(
          subcategory.products.reduce(
            (acc2: ProductAttributeValue[], product: Product) => {
              return acc2.concat(
                product.productVariants.reduce(
                  (
                    acc3: ProductAttributeValue[],
                    productVariant: ProductVariant
                  ) => {
                    return acc3.concat(productVariant.productAttributeValues);
                  },
                  []
                )
              );
            },
            []
          )
        );
      },
      []
    );

    const uniqueProductAttributeValues = Array.from(
      new Set(
        subcategoryProductAttributeValues
          .concat(productVariantAttributeValues)
          .map((value) => value.id)
      )
    ).map((id) => {
      return subcategoryProductAttributeValues
        .concat(productVariantAttributeValues)
        .find((value) => value.id === id);
    });

    return res.json(uniqueProductAttributeValues);
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
    if (!tkUser.isAdmin) {
      return res
        .status(401)
        .json("You are not authorized to create product attribute values!");
    }
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
  getProductAttributeValuesBySubcategory,
  getProductAttributeValuesByCategoryId,
  createProductAttributeValue,
};
