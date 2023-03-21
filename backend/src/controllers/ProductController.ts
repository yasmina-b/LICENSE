import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductAttributeValuesByProductId,
  getProductByProductId,
  getProductsByCategoryId,
  getProductsBySubcategoryId,
  getProductsFromFirstCategory,
  getProductsFromLastCategory,
} from "../services/ProductService";
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/productsFirst", getProductsFromFirstCategory);
router.get("/productsLast", getProductsFromLastCategory);
router.get("/product/:productId", getProductByProductId);
router.get(
  "/productAttributeValues/:productId",
  getProductAttributeValuesByProductId
);
router.get("/products/:subcategoryId", getProductsBySubcategoryId);
router.get("/productsCategory/:categoryId", getProductsByCategoryId);
router.post("/admin/product/:subcategoryId", createProduct);
router.delete("/admin/product/:productId", deleteProduct);

module.exports = router;
