import express = require("express");
import { createOrder } from "../services/OrderService";
const router = express.Router();

module.exports = router;

router.post("/order", createOrder);
