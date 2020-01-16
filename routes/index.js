var express = require("express");
var router = express.Router();
const { isAuthenticated } = require("../middlewares/authentication");

// PAsamos el middleware como segundo parametro y desarrollamos la lógica de la función principal de la ruta index
router.get("/", isAuthenticated, (req, res, next) => {
  // en caso de entrar a la función, quiere decir que el usuario esta autorizado
  res.json({ message: "Autorizado" });
});
router.use("/auth", require("./auth"));
router.use("/products", require("./products"));
router.use("/users", require("./users"));
router.use("/email", require("./email"));
router.use("/image", require("./upload"));

module.exports = router;
