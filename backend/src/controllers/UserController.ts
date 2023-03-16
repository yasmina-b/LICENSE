import express = require("express");
const router = express.Router();
import { getUser } from "../services/UserService";
import { verifyToken } from "../middleware/verifyToken";

router.get("/user", verifyToken, getUser); // get user

module.exports = router;
