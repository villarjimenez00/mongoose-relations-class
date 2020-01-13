const express = require("express");
const router = express.Router();
const { isAutenticated } = require("../../middlewares/authentication");
const product = require("../../controllers/product");

router.post("/", isAutenticated, product.new);

module.exports = router;
