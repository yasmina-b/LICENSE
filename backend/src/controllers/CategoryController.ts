import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByCategoryId,
} from "../services/CategoryService";

router.get("/categories", getAllCategories);
router.get("/category/:categoryId", getCategoryByCategoryId);
router.post("/admin/category", verifyToken, createCategory);
router.delete("/admin/category/:categoryId", verifyToken, deleteCategory);

module.exports = router;
