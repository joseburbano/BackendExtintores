const BaseService = require("./base.service");
const moment = require("moment");

let _controlRepository = null;

class ControlService extends BaseService {
  constructor({ ControlRepository }) {
    super(ControlRepository);
    _controlRepository = ControlRepository;
  }

  async controlPanelData(fecha) {
    var contador = 0;
    var contadora = 0;

    if (!fecha) {
      const error = new Error();
      error.status = 404;
      error.message = "the date is necessary to be able to send the data";
      throw error;
    }

    const userQuantity = await _controlRepository.countUser();

    if (!userQuantity) {
      const error = new Error();
      error.status = 404;
      error.message = "No users found.";
      throw error;
    }

    const currentElement = await _controlRepository.countElement();
    const numberOfElements = currentElement.length;

    if (!currentElement || !numberOfElements) {
      const error = new Error();
      error.status = 404;
      error.message = "No item or extinguisher found.";
      throw error;
    }

    const currentElementWel = await _controlRepository.stateElementWell();
    const currentElementWell = currentElementWel.length;

    if (!currentElementWell) {
      const error = new Error();
      error.status = 404;
      error.message = "No element or extinguisher found in good condition.";
      throw error;
    }

    const currentElementBa = await _controlRepository.stateElementBad();
    const currentElementBad = currentElementBa.length;

    if (!currentElementBad) {
      const error = new Error();
      error.status = 404;
      error.message = "No element or extinguisher in bad condition was found.";
      throw error;
    }

    currentElement.map((elemento) => {
      var fc = moment(elemento.fechaVencimiento).format("YYYY-MM-DD");
      var result = moment(fc).diff(fecha, "days");

      if (result <= 0) {
        contador = contador + 1;
        return contador;
      }

      if (result <= 30) {
        contadora = contadora + 1;
        return contadora;
      }
    });

    if (contadora || contador) {
      const error = new Error();
      error.status = 404;
      error.message = "server error calculating due dates.";
      throw error;
    }

    const currentCovid = await _controlRepository.countCovid();
    if (!currentCovid) {
      const error = new Error();
      error.status = 404;
      error.message = "No covid record was found.";
      throw error;
    }

    const currentCountPartic = await _controlRepository.countParticiBab();
    const currentCountPartici = currentCountPartic.length;

    if (currentCountPartici) {
      const error = new Error();
      error.status = 404;
      error.message = "No participation record found.";
      throw error;
    }

    const currentCovidPlas = await _controlRepository.countCovidTrein();
    const currentCovidPlass = currentCovidPlas.length;

    if (!currentCovidPlass) {
      const error = new Error();
      error.status = 404;
      error.message = "No covid record was found.";
      throw error;
    }

    const datos = {
      userQuantity,
      contador,
      contadora,
      numberOfElements,
      currentElementWell,
      currentElementBad,
      currentCovid,
      currentCountPartici,
      currentCovidPlass,
    };

    return await datos;
  }
}

module.exports = ControlService;
