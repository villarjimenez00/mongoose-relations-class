var express = require("express");
var router = express.Router();
const path = require("path");
const { isAuthenticated } = require("../../middlewares/authentication");
const User = require("../../models/User");

router.get("/", isAuthenticated, async (req, res) => {
  const user = req.user;

  try {
    // Recogemos el usuario
    const userDB = await User.findById(user._id);

    // Construimos el path de la imagen
    const pathImage = path.resolve(__dirname, `../../uploads/users/${userDB.img}`)

    // Comprobamos si la imagen existe y, si no existe, devolvemos una imagen por defecto. 

    // Enviamos la imagen
    res.sendFile(pathImage);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
