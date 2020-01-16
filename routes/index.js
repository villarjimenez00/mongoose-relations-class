var express = require("express");
var router = express.Router();
const { isAuthenticated } = require("../middlewares/authentication");

// PAsamos el middleware como segundo parametro y desarrollamos la lógica de la función principal de la ruta index
router.get("/", isAuthenticated, (req, res, next) => {
  // en caso de entrar a la función, quiere decir que el usuario esta autorizado
  res.json({ message: "Autorizado" });
});

module.exports = router;
