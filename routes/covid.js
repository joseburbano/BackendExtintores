//librerias del servidor
const express = require("express");
//importamos mildeware  de autenticacion
const md_auth = require("../middleware/authenticated");

const api = express.Router();

const getAvatarCovidControllers = require("../Controllers/covidControllers/getAvatarCovid/getAvatarCovid");
const addCovidControllers = require("../Controllers/covidControllers/addCovid/addCovid");
const listCovidControllers = require("../Controllers/covidControllers/listCovid/listCovid");
const exportListToExcelCovidControllers = require("../Controllers/covidControllers/exportListToExcel/exportListToExcel");
const deleteCovidControllers = require("../Controllers/covidControllers/deleteCovid/deleteCovid");
const updateCovidControllers = require("../Controllers/covidControllers/updateCovid/updateCovid");
const bringASingleCovidDataControllers = require("../Controllers/covidControllers/bringASingleCovidData/bringASingleCovidData");

//COVID

//RUTAS PARAS COVID

//Agrega Covids
api.post("/add-covid/:id", [md_auth.ensureAuth], addCovidControllers.addCovid);

//Eliminar Covids
api.delete(
  "/delete-covid/:id",
  [md_auth.ensureAuth],
  deleteCovidControllers.deleteCovid
);

//Actualizar Covids
api.put(
  "/update-covid/:id",
  [md_auth.ensureAuth],
  updateCovidControllers.updateCovid
);

//En listar todo los covids
api.get("/get-covids", [md_auth.ensureAuth], listCovidControllers.getCovids);

//En listar todo los covids
api.get("/get-avatar-covids", [md_auth.ensureAuth], getAvatarCovidControllers.getAvatar);

//En listar un solo dato covid
api.get("/get-covid/:url", bringASingleCovidDataControllers.getCovi);

//informe de covid
api.get("/informe-covid", [md_auth.ensureAuth], exportListToExcelCovidControllers.exportExcelCovid);

module.exports = api;
