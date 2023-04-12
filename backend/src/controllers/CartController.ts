import express = require("express");
import {
  createCart,
  deleteCartEntry,
  getCartEntriesByCartId,
  getCartEntryById,
  getCartTotalSum,
  getProductVariantByCartEntryId,
} from "../services/CartService";
const router = express.Router();

router.post("/cartEntries", createCart);
router.get("/cartEntries/:cartId", getCartEntriesByCartId);
router.get("/productVariantInCart/:cartEntryId", getProductVariantByCartEntryId);
router.get("/cartTotal/:cartId", getCartTotalSum);
router.delete("/cartEntry/:cartEntryId", deleteCartEntry);

module.exports = router;
