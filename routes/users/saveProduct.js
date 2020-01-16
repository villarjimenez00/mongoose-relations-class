const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");

const user = require("../../controllers/user");

router.put("/:id", isAuthenticated, user.saveProduct);

module.exports = router;
