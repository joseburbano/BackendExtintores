//librerias del servidor
const express = require("express");
const controlControllers = require("../Controllers/controControllers/controlControllers");

const api = express.Router();

//CREAMOS TODAS LAS RUTAS

//CONTROL EXTINTOREES ES HOME INICIO

//contar usuarios
api.get("/datos-inicio/:fecha", controlControllers.datosInicio);



module.exports = api;
