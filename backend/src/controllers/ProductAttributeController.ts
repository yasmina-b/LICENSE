import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProductAttribute,
  getAllProductAttributes,
} from "../services/ProductAttributeService";
const router = express.Router();

router.get("/productAttributes", getAllProductAttributes);
router.post(
  "/admin/productAttribute/:subcategoryId",
  verifyToken,
  createProductAttribute
);

module.exports = router;
