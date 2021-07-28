//librerias del servidor
const express = require("express");
//importamos mildeware  de autenticacion
const md_auth = require("../middleware/authenticated");
//mildeware para importar archivos que quiere que quiere cargar el usuario como fotos y archivos
const multipart = require("connect-multiparty");
const md_upload_avatar = multipart({ uploadDir: "./uploads/avatar" });


const api = express.Router();

//importamos controlladores
const userControllers = require("../Controllers/usersConstrollers/userControllers");


 //RUTAS DE USUARIO
  //registrarse sin estar logueado opcional para futuro se agregan pero no quedan activos
  api.post("/sing-up", userControllers.signUp);
  //datos usuarios
  api.get("/user/:id", userControllers.user);
  //Obtener todos los usuarios
  api.get("/get-users", userControllers.getUsers);
  //obtiene un solo usuario para login o iniciar sesion
  api.post("/sign-in", userControllers.signIn);
  //obtener todos los usuarios activados
  api.get(
    "/get-users-active",
    [md_auth.ensureAuth],
    userControllers.getUsersActive
  );
  //actualizar un usuario el avatar dos mildeware uno de autenticacion y el de fichero
  api.put(
    "/upload-avatar/:id",
    [md_auth.ensureAuth, md_upload_avatar],
    userControllers.uploadAvatar
  );
  //actualizar un usuario el avatar dos mildeware uno de autenticacion y el de fichero movil
  api.put(
    "/upload-avatar-movil/:id",
    [md_auth.ensureAuth, md_upload_avatar],
    userControllers.uploadAvatarMovil
  );
  //aca otenemos el avatar la imagen para enviar al fron
  api.get("/get-avatar/:avatarName", userControllers.getAvatar);
  //actualizamos usuario
  api.put(
    "/update-user/:id",
    [md_auth.ensureAuth],
    userControllers.updateUser
  );
  //activar usuarios
  api.put(
    "/activate-user/:id",
    [md_auth.ensureAuth],
    userControllers.activateUser
  );
  //Eliminar usuarios
  api.delete(
    "/delete-user/:id",
    [md_auth.ensureAuth],
    userControllers.deleteUser
  );
  //agregar usuarios desde administrador
  api.post(
    "/sign-up-admin",
    [md_auth.ensureAuth],
    userControllers.signUpAdmin
  );

  module.exports = api;
