 //librerias del servidor
const express = require("express");
//importamos mildeware  de autenticacion
const md_auth = require("../middleware/authenticated");

const api = express.Router();
 
 const covidControllers = require("../Controllers/covidControllers");

 //COVID

  //rutas para los covids
  api.post(
    "/add-covid/:id",
    [md_auth.ensureAuth],
    covidControllers.addCovid
  );
  //Agrega Covids
  api.delete(
    "/delete-covid/:id",
    [md_auth.ensureAuth],
    covidControllers.deleteCovid
  );
  //Eliminar Covids

  api.put(
    "/update-covid/:id",
    [md_auth.ensureAuth],
    covidControllers.updateCovid
  );
  //Actualizar Covids

  api.get("/get-covids", [md_auth.ensureAuth], covidControllers.getCovids);
  //En listar todo los covids

  api.get(
    "/get-avatar-covids",
    [md_auth.ensureAuth],
    covidControllers.getAvatar
  );
  //En listar todo los covids

  api.get("/get-covid/:url", covidControllers.getCovi);
  //En listar un solo covid

  //informe de covid
  api.get(
    "/informe-covid",
    [md_auth.ensureAuth],
    covidControllers.exportarCovid
  );

  module.exports = api;