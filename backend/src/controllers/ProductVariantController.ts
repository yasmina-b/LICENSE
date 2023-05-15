import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProductVariant,
  getAllProductVariants,
  getProductAttributeValuesByProductVariantId,
  getProductVariantByProductAttributeValue,
  getProductVariantByProductVariantId,
  getProductVariantsByProductAttributeValue,
  getProductVariantsByProductId,
  getProductVariantsOfCategoyByProductAttributeValue,
  updateProductVariant,
} from "../services/ProductVariantService";

const router = express.Router();

router.get("/productVariants/:productId", getProductVariantsByProductId);
router.get(
  "/productVariant/:productVariantId",
  getProductVariantByProductVariantId
);
router.get(
  "/productAttributeValues/:productVariantId",
  getProductAttributeValuesByProductVariantId
);
router.get("/productVariants", getAllProductVariants);
router.get("/productVariantBySize", getProductVariantByProductAttributeValue);
router.get(
  "/filteredBySize/:subcategoryId",
  getProductVariantsByProductAttributeValue
);
router.get(
  "/filteredBySizeCategory/:categoryId",
  getProductVariantsOfCategoyByProductAttributeValue
);
router.post("/admin/productVariant/:productId", createProductVariant);
router.put(
  "/updateProductVariant/:productVariantId",
  verifyToken,
  updateProductVariant
);

module.exports = router;
