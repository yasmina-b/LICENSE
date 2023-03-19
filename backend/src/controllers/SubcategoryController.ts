import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();
import {
  createSubcategory,
  getAllSubcategories,
  deleteSubcategory,
} from "../services/SubcategoryService";

router.get("/subcategories", getAllSubcategories);
router.post("/admin/subcategory/:categoryId", createSubcategory);
router.delete("/admin/subcategory/:subcategoryId", deleteSubcategory);

module.exports = router;
