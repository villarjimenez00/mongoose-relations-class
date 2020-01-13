const express = require("express");
const router = express.Router();
const { isAutenticated } = require("../../middlewares/authentication");

const product = require("../../controllers/product");

router.get("/:id", isAutenticated, product.getById);

module.exports = router;
