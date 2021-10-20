const { Router } = require("express");

module.exports = function ({ AuthController }) {
  const router = Router();

  //registrarse sin estar logueado opcional para futuro se agregan pero no quedan activos
  router.post("/signup", AuthController.signUp);

  //obtiene un solo usuario para login o iniciar sesion
  router.post("/signin", AuthController.signIn);

  //refrescar toqken
  // router.post("/refresh-access-token", AuthController.refreshAccessToken);

  return router;
};
