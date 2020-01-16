const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const uuid = require("uuid/v1");
const nodemailer = require("nodemailer");
const emailConfirmationTemplate = require("../emailConfirmationTemplate");

module.exports = async (req, res) => {
  const { username, password, email, name } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) return res.status(409).json({ error: "El usuario ya existe" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Hubo un error" });
  }

  try {
    console.log("Creando usuario");
    const hashPass = bcrypt.hashSync(password, 10);

    const confirmationCode = uuid();
    console.log(confirmationCode);

    const user = new User({
      username,
      password: hashPass,
      email,
      name,
      confirmationCode
    });
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER_NODEMAILER,
        pass: process.env.PASSWORD_NODEMAILER
      }
    });

    const response = await transporter.sendMail({
      from: process.env.USER_NODEMAILER,
      to: email,
      subject: "Confirmación de email",
      text:
        "Copie y pegue la siguiente url para confirmar: http://localhost:3000/users/codeconfirmation/${confirmationCode}",
      html: emailConfirmationTemplate({ name, confirmationCode })
    });

    res.json({ user, response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error" });
  }
};
