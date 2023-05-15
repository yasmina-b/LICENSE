import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProductAttributeValue,
  getAllProductAttributeValues,
  getProductAttributeValuesByCategoryId,
  getProductAttributeValuesBySubcategory,
} from "../services/ProductAttributeValueService";
const router = express.Router();

router.get("/productAttributeValues", getAllProductAttributeValues);
router.get(
  "/productSizes/:subcategoryId",
  getProductAttributeValuesBySubcategory
);
router.get("/productSizesCategory/:categoryId", getProductAttributeValuesByCategoryId);
router.post(
  "/admin/productAttributeValue/:productAttributeId",
  verifyToken,
  createProductAttributeValue
);

module.exports = router;
