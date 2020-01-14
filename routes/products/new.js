const express = require("express");
const router = express.Router();
const { isAutenticated } = require("../../middlewares/authentication");
const isUserActive = require("../../middlewares/isUserActive");
const product = require("../../controllers/product");

router.post("/", [isAutenticated, isUserActive], product.new);

module.exports = router;
