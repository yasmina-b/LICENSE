import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();
import {
  createSubcategory,
  getAllSubcategories,
  deleteSubcategory,
  getSubcategoriesByCategoryId,
  getSubcategoryBySubcategoryId,
  getSubcategoriesOfFirstCategoryId,
  getSubcategoriesOfLastCategoryId,
} from "../services/SubcategoryService";

router.get("/subcategories", getAllSubcategories);
router.get("/subcategoriesFirst", getSubcategoriesOfFirstCategoryId);
router.get("/subcategoriesLast", getSubcategoriesOfLastCategoryId);
router.get("/subcategories/:categoryId", getSubcategoriesByCategoryId);
router.get("/subcategory/:subcategoryId", getSubcategoryBySubcategoryId);
router.post("/admin/subcategory/:categoryId", verifyToken, createSubcategory);
router.delete(
  "/admin/subcategory/:subcategoryId",
  verifyToken,
  deleteSubcategory
);

module.exports = router;
