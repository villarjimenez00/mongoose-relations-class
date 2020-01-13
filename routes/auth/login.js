const express = require("express");
const router = express.Router();

const auth = require("../../controllers/auth");
// 3. Definimos la ruta login para devolver el token al usuario
router.post("/", auth.login);

module.exports = router;
