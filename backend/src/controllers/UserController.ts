import express = require("express");
import { verifyToken } from "../middleware/verifyToken";
const router = express.Router();
import { getAllUsers, updateUserDetails } from "../services/UserService";

router.get("/admin/users/", verifyToken, getAllUsers);
router.put("/user/:userId", updateUserDetails);

module.exports = router;
