const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");
const product = require("../../controllers/product");

router.post("/", [isAuthenticated, isUserActive], product.new);

module.exports = router;
