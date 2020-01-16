const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const uuid = require("uuid/v1");
const nodemailer = require("nodemailer");
const emailConfirmationTemplate = require("../emailConfirmationTemplate");

module.exports = {
  login: require("./login"),
  signup: require("./signup")
};
