const { Router } = require("express");

module.exports = function ({ ControlController }) {
  const router = Router();

  //CONTROL EXTINTOREES ES HOME INICIO

  //datos de inicio
  router.get("/start-data/:fecha", ControlController.controlPanelData);

  return router;
};
