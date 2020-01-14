var express = require("express");
var router = express.Router();

router.use("/send", require("./sendEmail"));

module.exports = router;
