var express = require("express");
var router = express.Router();

router.use("/new", require("./new"));
router.use("/getById", require("./getById"));

module.exports = router;
