const { Router } = require("express");
const { AuthMiddleware } = require("../middleware");

module.exports = function ({ PermitController }) {
  const router = Router();

  //RUTAS DE PERMISOS

  //agregar permisos
  router.post(
    "/add-permissions",
    [AuthMiddleware],
    PermitController.addPermissions,
  );

  //traer permisos
  router.get(
    "/get-permissions",
    [AuthMiddleware],
    PermitController.getPermissionsBring,
  );

  return router;
};
