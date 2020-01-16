const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");
const product = require("../../controllers/product");

router.get("/:id", [isAuthenticated, isUserActive], product.getById);

module.exports = router;
