import express = require("express");
const router = express.Router();
import { getAllUsers, updateUserDetails } from "../services/UserService";

router.get("/admin/users/", getAllUsers);
router.put("/user/:userId", updateUserDetails);

module.exports = router;
