//librerias del servidor
const express = require("express");

const api = express.Router();

//importamos controlladores
const authControllers = require("../Controllers/authControllers");

api.post("/refresh-access-token", authControllers.refreshAccessToken);

 
module.exports = api;
