var express = require("express");
var router = express.Router();
const path = require("path");
const { isAuthenticated } = require("../../middlewares/authentication");
const User = require("../../models/User");
const fs = require("fs");

// 4.2. Subida de archivos
router.post("/", isAuthenticated, async (req, res) => {

  // Comprobamos si se han enviados archivos desde el cliente. 
  if (!req.files)
    return res.status(400).json({ message: "No se ha enviado ningún archivo" });

  const user = req.user;

  const { imageFile } = req.files;

  // Creamos una lista con las extensiones validas.
  const validExtensions = ["png", "jpg", "svg", "jpeg"];

  //Dividimos el nombre del archivo extrayendo la extensión del nombre
  const splitedImageFileName = imageFile.name.split(".");

  //recogemos la extensión
  const extensionImage = splitedImageFileName[splitedImageFileName.length - 1];

  // comprobamos que la extensión recibida concuera con las extensiones validas
  if (!validExtensions.includes(extensionImage)) {
    return res
      .status(422)
      .json({ message: "La extensión del archivo no es válida" });
  }

  //eliminamos la extensión del array
  splitedImageFileName.pop();

  // creamos un nuevo nombre para el guardado del archivo con una id (en este caso le añadimos los milisegundos) y añadimos la extensión
  const fileNameWithId = `${splitedImageFileName}-${new Date().getMilliseconds()}.${extensionImage}`;

  // Creamos el path absoluto donde guardaremos el archivo.
  const pathImage = path.resolve(
    __dirname,
    `../../uploads/users/${fileNameWithId}`
  );

  try {
    // Guardamos el archivo en el path señalado.
    await imageFile.mv(pathImage);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }

  try {
    // Guardamos el nombre del archivo en el usuario. 
    //Guardamos solo el nombre de la imagen por si más adelante cambiamos el path. 
    const userDB = await User.findByIdAndUpdate(user._id, {
      img: fileNameWithId
    });

    // Recogemos el nombre del archivo anterior para poder eliminarlo de la carpeta y construimos el path
    const oldImagePath = path.resolve(
      __dirname,
      `../../uploads/users/${userDB.img}`
    );

    // Si existe un archivo en dicho path con ese nombre, lo borramos. 
    if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);

    // Devolvemos la respuesta de éxito
    res.json({
      message: `imagen guardada correctamente en el usuario ${user.name}`
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }

// 4.3. Continúa en ./getImage para el envío de la imagen


  // guardado de imagen con Callback
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
