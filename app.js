require("dotenv").config();
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");

const fileUpload = require("express-fileupload");

var app = express();

//-----------------------------------------------------------//
// 1. CONFIGURACIÓN DE LA ESTRATEGIA DE PASSPORT LOCAL Y JWT //
//-----------------------------------------------------------//

require("./passport/config")(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

//----------------------------//
//    4. SUBIDA DE ARCHIVOS   //
//----------------------------//
// 4.1. configuración de middleware de recogida de archivos
app.use(fileUpload());
// 4.2. (continúa en ./routes/upload/upload)

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json({ message: "Not found" });
});

mongoose
  .connect("mongodb://localhost:27017/auth-jwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Base de datos conectada"))
  .catch(() => {
    throw error;
  });

module.exports = app;
