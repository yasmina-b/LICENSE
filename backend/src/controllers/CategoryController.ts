import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();
import { createCategory, deleteCategory, getAllCategories } from "../services/CategoryService";

router.get("/categories", getAllCategories);
router.post("/admin/category", createCategory);
router.delete("/admin/category/:categoryId", deleteCategory);

module.exports = router;
