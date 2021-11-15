const { Router } = require("express");
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware,
} = require("../middleware");
const multipart = require("connect-multiparty");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });
const { CACHE_TIME } = require("../helpers");

module.exports = function ({ UserController }) {
  const router = Router();

  //RUTAS DE USUARIO

  //obtener todos los usuarios activados
  router.get(
    "/users-active",
    [ParseIntMiddleware],
    UserController.getUsersActive,
  );

  //Obtener todos los usuarios
  router.get(
    "/users",
    [ParseIntMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)],
    UserController.getAll,
  );

  //datos usuarios
  router.get("/:userId", UserController.get);

  //actualizar un usuario el avatar dos mildeware uno de autenticacion y el de fichero
  router.put(
    "/upload-avatar/:userId",
    [AuthMiddleware, md_upload_avatar],
    UserController.uploadAvatar,
  );

  //aca otenemos el avatar la imagen para enviar al fron
  router.get("/get-avatar/:avatarName", UserController.getAvatar);

  //actualizamos usuario
  router.put(
    "/update-user/:userId",
    [AuthMiddleware],
    UserController.updateUser,
  );

  //activar usuarios
  router.put(
    "/activate-user/:userId",
    [AuthMiddleware],
    UserController.activateUser,
  );

  //Eliminar usuarios
  router.delete(
    "/delete-user/:userId",
    [AuthMiddleware],
    UserController.delete,
  );

  //agregar usuarios desde administrador
  router.post("/sign-up-admin", [AuthMiddleware], UserController.signUpAdmin);

  return router;
};
