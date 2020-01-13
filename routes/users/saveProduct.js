const express = require("express");
const router = express.Router();
const { isAutenticated } = require("../../middlewares/authentication");

const user = require("../../controllers/user");

router.put("/:id", isAutenticated, user.saveProduct);

module.exports = router;
