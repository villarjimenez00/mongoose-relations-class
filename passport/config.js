const passport = require("passport");

module.exports = app => {
  // 1.1 CONFIGURAMOS EN EXPRESS LA CONFIGURACIÓN DE PASSPORT
  /* Dado que para la autenticación por token no es necesario el uso de sesiones
  no será necesario la configuración de la sessión:
    app.use(passport.session());

  Tampoco será necesario configurar, por tanto, el serialize y deserialize  */
  app.use(passport.initialize());

  // 1.2. DEFINIMOS LA ESTRATEGIA LOCAL.
  /* Esta estrategia servirá para establecer el login. 
  En ella comprobaremos que los datos de usuario son correctos (en este caso que exista y que la 
  contraseña sea validad) */

  passport.use(require("./strategies/localStrategy"));
  // 1.3. Tras esta función definiremos la ruta login (ir a ./routes/auth/login para continuar)

  passport.use(require("./strategies/jwtStrategy"));

  // 1.5. Tras esto, podemos proceder a autenticar las rutas (ir a ./routes/index)
};
