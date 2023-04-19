import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProductAttributeValue,
  getAllProductAttributeValues,
} from "../services/ProductAttributeValueService";
const router = express.Router();

router.get("/productAttributeValues", getAllProductAttributeValues);
router.post(
  "/admin/productAttributeValue/:productAttributeId",
  verifyToken,
  createProductAttributeValue
);

module.exports = router;
