const express = require("express");
const router = express.Router();

const user = require("../../controllers/user");

router.get("/:confirmationcode", user.confirm);
module.exports = router;
