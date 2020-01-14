var express = require("express");
var router = express.Router();

router.use("/saveProduct", require("./saveProduct"));
router.use("/deleteProduct", require("./deleteProduct"));
router.use("/codeconfirmation", require("./confirmUser"));

module.exports = router;
