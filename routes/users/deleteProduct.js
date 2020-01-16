const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");

const user = require("../../controllers/user");

router.delete("/:id", isAuthenticated, user.deleteProduct);

module.exports = router;
