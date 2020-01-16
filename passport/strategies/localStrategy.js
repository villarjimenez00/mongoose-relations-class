// importamos la estrategia local
const LocalStrategy = require("passport-local").Strategy;

// Sustituido bcrypt por bcrypjs para su implementación también en windows
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
// La estrategía local recibe un primer parametro de configuración y un callback de verificación como segundo parametro
module.exports = new LocalStrategy(
  {
    // Los campos usernameField y passwordField, servirán para definir
    // el nombre de los atributos por los que encontraremos y comprobaremos al usuario
    usernameField: "email",
    passwordField: "password",
    // Dado que no haremos uso de sesiones, es necesaria especificarlo en las distintas estrategias poniendolo a false.
    session: false
  },
  async (email, password, next) => {
    console.log(
      `Estrategia local. Información recibida: email ${email}, password${password}`
    );
    try {
      // Buscamos el usuario a travñes del email
      const user = await User.findOne({ email });

      /*Si no hay usuario enviamos ejecutamos next con el primer parametro (error) a null, el segundo parametro 
     (data, en este caso usuario) a false y el tercer parametro (info) con el mensaje de error*/
      if (!user) next(null, false, { message: "El usuario no existe" });

      // comprobamos la contraseña y procedemos igual que si no hay usuario
      if (!bcrypt.compareSync(password, user.password))
        next(null, false, { message: "la contraseña no es correcta" });

      // Si el usuario existe y la contraseña es correcta, lo enviamos como segundo parametro de la función next.
      next(null, user);
    } catch (error) {
      //Si hay un error, lo envíamos como primer parametro de la función next.
      next(error);
    }
  }
);
