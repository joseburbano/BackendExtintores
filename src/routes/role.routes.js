const { Router } = require("express");
const { AuthMiddleware } = require("../middleware");

module.exports = function ({ RoleController }) {
  const router = Router();

  //agregar roles
  router.post("/add-rol", RoleController.addRol);

  //actualizar rol al agregar menus y permisos
  router.put(
    "/update-rol-menu",
    [AuthMiddleware],
    RoleController.updateRolMenu,
  );

  //eliminar rol
  router.delete(
    "/delete-rol/:id",
    [AuthMiddleware],
    RoleController.deleteRolPermi,
  );

  //traer roles
  router.get("/get-roles-permi", [AuthMiddleware], RoleController.getRolPerm);

  //peticion para traer menu segun roles
  router.get(
    "/get-roles-as-allowed/:name",
    [AuthMiddleware],
    RoleController.getRoleBasedMenu,
  );

  //permisos caragado
  router.get(
    "/get-permissions-assigned-users/:name",
    [AuthMiddleware],
    RoleController.getAcordingToUserRoles,
  );

  return router;
};
