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
router.post(
  "/admin/productVariant/:productId",
  createProductVariant
);
router.put("/updateProductVariant/:productVariantId", updateProductVariant);

module.exports = router;
