import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProductVariant,
  getAllProductVariants,
  getProductAttributeValuesByProductVariantId,
  getProductVariantByProductVariantId,
  getProductVariantsByProductId,
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
router.post("/admin/productVariant/:productId", createProductVariant);

module.exports = router;
