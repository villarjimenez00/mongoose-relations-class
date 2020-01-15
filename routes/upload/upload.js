var express = require("express");
var router = express.Router();
const path = require("path");
const { isAutenticated } = require("../../middlewares/authentication");
const User = require("../../models/User");
const fs = require("fs");

router.post("/", isAutenticated, async (req, res) => {
  if (!req.files)
    return res.status(400).json({ message: "No se ha enviado ningún archivo" });

  const user = req.user;

  const { imageFile } = req.files;

  const validExtensions = ["png", "jpg", "svg", "jpeg"];

  const splitedImageFileName = imageFile.name.split(".");

  const extensionImage = splitedImageFileName[splitedImageFileName.length - 1];

  splitedImageFileName.pop();

  const fileNameWithId = `${splitedImageFileName}-${new Date().getMilliseconds()}.${extensionImage}`;

  if (!validExtensions.includes(extensionImage)) {
    return res
      .status(422)
      .json({ message: "La extensión del archivo no es válida" });
  }

  const pathImage = path.resolve(
    __dirname,
    `../../uploads/users/${fileNameWithId}`
  );

  try {
    await imageFile.mv(pathImage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }

  try {
    const userDB = await User.findByIdAndUpdate(user._id, {
      img: fileNameWithId
    });

    const oldImagePath = path.resolve(
      __dirname,
      `../../uploads/users/${userDB.img}`
    );
    console.log(oldImagePath);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }
    res.json({
      message: `imagen guardada correctamente en el usuario ${user.name}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }

  // Callback
  //   imageFile.mv(`${pathImage}/${fileNameWithId}`, (error, data) => {
  //     if (error) {
  //       console.log(error);
  //       res.status(400).json({ error });
  //     }
  //     res.json({ message: imageFile });
  //   });

  // Async
});

module.exports = router;
