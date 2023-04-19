import express = require("express");
import {
  createOrder,
  getAllOrders,
  getOrder,
  getUserOrders,
} from "../services/OrderService";
const router = express.Router();

router.post("/order", createOrder);
router.get("/orders", getAllOrders);
router.get("/orders/:userId", getUserOrders);
router.get("/order/:orderId", getOrder);

module.exports = router;
