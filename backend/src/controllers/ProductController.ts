import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
} from "../services/ProductService";
const router = express.Router();

router.get("/products", getAllProducts);
router.post("/admin/product/:subcategoryId", createProduct);
router.delete("/admin/product/:productId", deleteProduct);

module.exports = router;
