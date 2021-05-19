//fremeword express
const express = require("express");
//body p
const bodyParser = require("body-parser");

//
const app = express();
const { API_VERSION } = require("./config");

//Load routings
const userRoutes = require("./routes/user");
const covidRoutes = require("./routes/covid");
const extintorRoutes = require("./routes/extintor");
const normaParticipacionRoutes = require("./routes/normaParticipativa");
const tokenRoutes = require("./routes/token");
const inicioRoutes = require("./routes/inicio");
const menuRoutes = require("./routes/menu");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Header HTTP
//Configurar los headers HTTP para poder iniciar sesion
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Router Basic
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, covidRoutes);
app.use(`/api/${API_VERSION}`, extintorRoutes);
app.use(`/api/${API_VERSION}`, normaParticipacionRoutes);
app.use(`/api/${API_VERSION}`, tokenRoutes);
app.use(`/api/${API_VERSION}`, inicioRoutes);
app.use(`/api/${API_VERSION}`, menuRoutes);

module.exports = app;