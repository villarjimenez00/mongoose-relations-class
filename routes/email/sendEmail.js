var express = require("express");
var router = express.Router();
const { isAutenticated } = require("../../middlewares/authentication");
const nodemailer = require("nodemailer");
const emailTemplate = require("./template-email");

router.post("/", isAutenticated, async (req, res) => {
  const { email, message, subject, name } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.USER_NODEMAILER,
      pass: process.env.PASSWORD_NODEMAILER
    }
  });

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
