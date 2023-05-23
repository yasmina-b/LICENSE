import { AuthenticatedRequest } from "../middleware/verifyToken";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import Product from "../entities/Product";
import ProductVariant from "../entities/ProductVariant";
import ProductAttributeValue from "../entities/ProductAttributeValue";
import Subcategory from "../entities/Subcategory";
import Category from "../entities/Category";

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

export const getProductVariantByProductAttributeValue = async (
  req: Request,
  res: Response
) => {
  const { productId, productAttributeValueId } = req.body;

  try {
    const productVariant = await AppDataSource.getRepository(ProductVariant)
      .createQueryBuilder("pv")
      .leftJoin("pv.product", "p")
      .leftJoin("pv.productAttributeValues", "pav")
      .where("p.id = :productId", { productId })
      .andWhere("pav.id = :productAttributeValueId", {
        productAttributeValueId,
      })
      .getOne();

    if (!productVariant) {
      return res.status(404).json({ message: "ProductVariant not found" });
    }

    const product = await AppDataSource.getRepository(Product)
      .createQueryBuilder("p")
      .leftJoin("p.productVariants", "pv")
      .where("pv.id = :productVariantId", {
        productVariantId: productVariant.id,
      })
      .getOne();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    productVariant.product = product;
    return res.json(productVariant);
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

export const getProductVariantsByProductAttributeValue = async (
  req: Request,
  res: Response
) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const productAttributeValueId = req.query.productAttributeValueId;

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

    const productVariantsWithAttribute = productVariants
      .filter((variant) =>
        variant.productAttributeValues.some(
          (value) => value.id === productAttributeValueId
        )
      )
      .filter((variant) => variant.quantityInStock > 0);

    return res.json(productVariantsWithAttribute);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getProductVariantsOfCategoyByProductAttributeValue = async (
  req: Request,
  res: Response
) => {
  try {
    const categoryId = req.params.categoryId;
    const productAttributeValueId = req.query.productAttributeValueId;

    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id: categoryId },
      relations: [
        "subcategories.productAttributes",
        "subcategories.productAttributes.productAttributeValues",
        "subcategories.products",
        "subcategories.products.productVariants",
        "subcategories.products.productVariants.productAttributeValues",
      ],
    });

    const productVariants = category.subcategories.reduce(
      (acc: ProductVariant[], subcategory: Subcategory) => {
        const subcategoryProductVariants = subcategory.products.reduce(
          (subAcc: ProductVariant[], product: Product) => {
            return subAcc.concat(product.productVariants);
          },
          []
        );
        return acc.concat(subcategoryProductVariants);
      },
      []
    );

    const productVariantsWithAttribute = productVariants
      .filter((variant) =>
        variant.productAttributeValues.some(
          (value) => value.id === productAttributeValueId
        )
      )
      .filter((variant) => variant.quantityInStock > 0);

    return res.json(productVariantsWithAttribute);
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
  const { quantityInStock, addedDate } = req.body;
  const { tkUser } = req;
  const { productId } = req.params;
  const { productAttributeValueId } = req.body;

  try {
    if (!tkUser.isAdmin) {
      return res
        .status(401)
        .json("You are not authorized to create product variants!");
    }
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
      quantityInStock,
      addedDate: new Date(),
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

export const updateProductVariant = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { quantityInStock } = req.body;
  const { productVariantId } = req.params;
  const { tkUser } = req;

  try {
     if (!tkUser.isAdmin) {
      return res
        .status(401)
        .json("You are not authorized to update product variants!");
    }
    const productVariant = await AppDataSource.getRepository(
      ProductVariant
    ).findOne({
      where: {
        id: productVariantId,
      },
    });

    if (!productVariant) {
      return res
        .status(400)
        .json(`Product variant with id ${productVariantId} does not exist`);
    }

    productVariant.quantityInStock = quantityInStock;

    await AppDataSource.getRepository(ProductVariant).save(productVariant);

    return res.json(productVariant);
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
  getProductVariantByProductAttributeValue,
  getProductVariantsByProductAttributeValue,
  getProductVariantsOfCategoyByProductAttributeValue,
  createProductVariant,
  updateProductVariant,
};
