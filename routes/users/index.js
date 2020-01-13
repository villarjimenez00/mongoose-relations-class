var express = require("express");
var router = express.Router();

router.use("/saveProduct", require("./saveProduct"));

module.exports = router;
