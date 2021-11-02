let _controlService = null;

class ControlController {
  constructor({ ControlService }) {
    _controlService = ControlService;
  }

  //agregar permisos
  async controlPanelData(req, res) {
    const { fecha } = req.params;
    await _controlService.controlPanelData(fecha).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "We did not find any startup data.",
        });
      } else {
        return res.json({
          code: 200,
          totalExtint: resul.numberOfElements,
          totalUse: resul.userQuantity,
          totalBueno: resul.currentElementWell,
          totalMalo: resul.currentElementBad,
          totalvencidos: resul.contador,
          proximosvencer: resul.contadora,
          totalCovid: resul.currentCovid,
          totalnorma: resul.currentCountPartici,
          totalCo: resul.currentCovidPlass,
        });
      }
    });
  }
}
module.exports = ControlController;
