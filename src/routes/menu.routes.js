const { Router } = require("express");
const { AuthMiddleware } = require("../middleware");

module.exports = function ({ MenuController }) {
  const router = Router();

  //RUTAS DE MENU

  // agregar menu
  router.post("/add-menu", [AuthMiddleware], MenuController.addMenu);

  return router;
};
