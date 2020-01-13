const express = require("express");
const router = express.Router();
const { isAutenticated } = require("../../middlewares/authentication");

const user = require("../../controllers/user");

router.delete("/:id", isAutenticated, user.deleteProduct);

module.exports = router;
