const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
require("express-async-errors");
const { NotFoundMiddleware, ErrorMiddleware } = require("../middleware");
const swaggerUI = require("swagger-ui-express");
const { SWAGGER_PATH, API_API, API_VERSION } = require("../config");
const swaggerDocument = require(SWAGGER_PATH);

module.exports = function ({
  ControlRoutes,
  HomeRoutes,
  UserRoutes,
  AuthRoutes,
  MenuRoutes,
  PermitRoutes,
  RoleRoutes,
  ParticipationRoutes,
  ElementsRoutes,
  CovidRoutes,
}) {
  const router = express.Router();
  const apiRoutes = express.Router();

  apiRoutes.use(express.json()).use(cors()).use(helmet()).use(compression());

  //Router Basic
  apiRoutes.use("/control", ControlRoutes);
  apiRoutes.use("/home", HomeRoutes);
  apiRoutes.use("/user", UserRoutes);
  apiRoutes.use("/auth", AuthRoutes);
  apiRoutes.use("/menu", MenuRoutes);
  apiRoutes.use("/permit", PermitRoutes);
  apiRoutes.use("/role", RoleRoutes);
  apiRoutes.use("/participation", ParticipationRoutes);
  apiRoutes.use("/elements", ElementsRoutes);
  apiRoutes.use("/covid", CovidRoutes);

  router.use(`/${API_API}/${API_VERSION}`, apiRoutes);
  router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  //middleware para cuando las rutas no existe envia retorno de resource not found
  router.use(NotFoundMiddleware);
  router.use(ErrorMiddleware);

  return router;
};
