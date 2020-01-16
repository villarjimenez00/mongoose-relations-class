var express = require("express");
var router = express.Router();
const { isAuthenticated } = require("../../middlewares/authentication");
const nodemailer = require("nodemailer");
const emailTemplate = require("./template-email");

router.post("/", isAuthenticated, async (req, res) => {
  const { email, message, subject, name } = req.body;


  // Creamos un transportador con la configuración del email. 
  // En este caso, dado que lo haremos a través de un servicio ya predeterminado (Gmail) solo configuramos el nombre del servicio y nuestras credenciales
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_NODEMAILER,
      pass: process.env.PASSWORD_NODEMAILER
    }
  });

  // Creado el transportador, enviamos con el el email con los parámetros necesarios para el envío
  // de forma asíncrona.
  try {
    const response = await transporter.sendMail({
      from: process.env.USER_NODEMAILER,
      to: email,
      subject,
      text: message,
      html: emailTemplate({ name, message, emitter: req.user.name })
    });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
