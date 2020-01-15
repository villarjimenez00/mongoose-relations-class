var express = require("express");
var router = express.Router();
const path = require("path");
const { isAutenticated } = require("../../middlewares/authentication");
const User = require("../../models/User");

router.get("/", isAutenticated, async (req, res) => {
  const user = req.user;

  try {
    const userDB = await User.findById(user._id);

    res.sendFile(path.resolve(__dirname, `../../uploads/users/${userDB.img}`));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
