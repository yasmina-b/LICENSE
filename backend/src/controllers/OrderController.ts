import express = require("express");
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getMostBoughtProductVariant,
  getOrder,
  getTotalEarnings,
  getUserOrders,
} from "../services/OrderService";
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", verifyToken, getAllOrders);
router.get("/orders/:userId", getUserOrders);
router.get("/order/:orderId", getOrder);
router.get("/earnings", verifyToken, getTotalEarnings);
router.delete("/admin/order/:orderId", verifyToken, deleteOrder);
router.get("/mostBought", verifyToken, getMostBoughtProductVariant);

module.exports = router;
