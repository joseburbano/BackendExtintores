//librerias del servidor
const express = require("express");
//importamos mildeware  de autenticacion
const md_auth = require("../middleware/authenticated");
const controlControllers = require("../Controllers/controlControllers");
const menuControllers = require("../Controllers/menuControllers");

const api = express.Router();

//CREAMOS TODAS LAS RUTAS

//CONTROL EXTINTOREES ES HOME INICIO

//contar usuarios
api.get("/datos-inicio/:fecha", controlControllers.datosInicio);

//MENUS

//agregar menu
// api.post("/add-menu", [md_auth.ensureAuth], menuControllers.addMenu);
//agregar permisos
// api.post(
//   "/agregar-permisos",
//   [md_auth.ensureAuth],
//   menuControllers.addPermisos
// );

//agregar roles
api.post("/add-roles", [md_auth.ensureAuth], menuControllers.addRoles);

//aptualizar rol al agregar menus y permisos
api.put("/update-roles-menus", menuControllers.actualizarRoleMenu);

//eliminar rol
api.delete(
  "/delete-roles/:id",
  [md_auth.ensureAuth],
  menuControllers.deleteRolesPermi
);

//traer roles
api.get("/get-roles-permi", [md_auth.ensureAuth], menuControllers.getRolesPerm);

//peticion para traer menu segun roles
api.get(
  "/get-roles-segun-permi/:name",
  [md_auth.ensureAuth],
  menuControllers.getMenuSegunRoles
);

//permisos caragado
api.get(
  "/get-permisos-usuarios-asignados/:name",
  [md_auth.ensureAuth],
  menuControllers.getSegunRolesUser
);

api.get(
  "/get-permisos",
  [md_auth.ensureAuth],
  menuControllers.getPermisosTraer
);

module.exports = api;
