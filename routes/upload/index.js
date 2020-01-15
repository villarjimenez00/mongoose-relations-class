var express = require("express");
var router = express.Router();

router.use("/upload", require("./upload"));
router.use("/getImage", require("./getImage"));

module.exports = router;
