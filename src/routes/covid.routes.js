const { Router } = require("express");
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware,
} = require("../middleware");
const { CACHE_TIME } = require("../helpers");

module.exports = function ({ CovidController }) {
  const router = Router();

  //COVID

  //RUTAS PARAS COVID

  //Agrega Covids
  router.post("/add-covid/:id", [AuthMiddleware], CovidController.addCovid);

  //Eliminar Covids
  router.delete(
    "/delete-covid/:id",
    [AuthMiddleware],
    CovidController.deleteCovid,
  );

  //Actualizar Covids
  router.put(
    "/update-covid/:id",
    [AuthMiddleware],
    CovidController.updateCovid,
  );

  //En listar todo los covids
  router.get(
    "/get-covids",
    [AuthMiddleware, ParseIntMiddleware],
    CovidController.getCovids,
  );

  //En listar todo los covids
  router.get("/get-avatar-covids/:avatarName", CovidController.getAvatar);

  //En listar un solo dato covid por url
  router.get("/get-covid/:url", CovidController.getCovi);

  //informe de covid
  router.get(
    "/report-covid",
    [AuthMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)],
    CovidController.exportExcelCovid,
  );

  return router;
};
