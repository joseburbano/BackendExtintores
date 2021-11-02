const { Router } = require("express");
const { CacheMiddleware } = require("../middleware");
const { CACHE_TIME } = require("../helpers");
module.exports = function ({ ControlController }) {
  const router = Router();

  //CONTROL EXTINTOREES ES HOME INICIO

  //datos de inicio
  router.get(
    "/start-data/:fecha",
    [CacheMiddleware(CACHE_TIME.ONE_HOUR)],
    ControlController.controlPanelData,
  );

  return router;
};
