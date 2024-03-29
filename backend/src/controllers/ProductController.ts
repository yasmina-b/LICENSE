import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductAttributeValuesByProductId,
  getProductByImageURL,
  getProductByProductId,
  getProductsByCategoryId,
  getProductsBySubcategoryId,
  getProductsFromFirstCategory,
  getProductsFromLastCategory,
  getRelatedProducts,
  getTotalMenProducts,
  getTotalWomenProducts,
} from "../services/ProductService";
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/findImage", getProductByImageURL);
router.get("/relatedProducts/:productId/:subcategoryId", getRelatedProducts);
router.get("/productsFirst", getProductsFromFirstCategory);
router.get("/productsLast", getProductsFromLastCategory);
router.get("/product/:productId", getProductByProductId);
router.get(
  "/productAttributeValues/:productId",
  getProductAttributeValuesByProductId
);
router.get("/products/:subcategoryId", getProductsBySubcategoryId);
router.get("/productsCategory/:categoryId", getProductsByCategoryId);
router.post("/admin/product/:subcategoryId", verifyToken, createProduct);
router.delete("/admin/product/:productId", verifyToken, deleteProduct);
router.get("/productsW", getTotalWomenProducts);
router.get("/productsM", getTotalMenProducts);

module.exports = router;
