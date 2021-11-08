let _covidService = null;

class CovidController {
  constructor({ CovidService }) {
    _covidService = CovidService;
  }

  //guardar nuevo registro de covid
  async addCovid(req, res) {
    const data = req.body;
    const { id } = req.params;
    await _covidService.addCovid(data, id).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Failed to register the health emergency covid.",
        });
      } else {
        return res.json({
          code: 200,
          message: "Successfully created health emergency covid record.",
        });
      }
    });
  }

  //eliminar registro de covid
  async deleteCovid(req, res) {
    const { id } = req.params;
    await _covidService.deleteCovid(id).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Failed to unregister covid.",
        });
      } else {
        return res.json({
          code: 200,
          message: "Covid record removed successfully.",
        });
      }
    });
  }

  //Enviar un solo registro de covid 19 por url
  async getCovi(req, res) {
    const { url } = req.params;
    await _covidService.getCovi(url).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Error when searching data from the Covid health registry.",
        });
      } else {
        const { user: avatar } = resul;
        return res.json({
          code: 200,
          covi: resul,
          avatar: avatar,
        });
      }
    });
  }

  //Exportar todos los datos para reporte a excel
  async exportExcelCovid(req, res) {
    await _covidService.exportExcelCovid().then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "No record of covid has been found.",
        });
      } else {
        return res.json({
          code: 200,
          totalCovid: result,
        });
      }
    });
  }

  //Enviar un foto al registro de normativa de participacion el del avatar el que lo reporto
  async getAvatar(req, res) {
    const avatarName = req.params.avatarName;
    await _covidService.getAvatar(avatarName).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message:
            "Error when sending the image of the avatar that published registration of covid.",
        });
      } else {
        return res.sendFile(resul);
      }
    });
  }

  //Enviar registros de covid
  async getCovids(req, res) {
    const { pageSize, pageNum } = req.query;
    await _covidService.getCovids(pageSize, pageNum).then((covid) => {
      if (!covid) {
        return res.json({
          code: 401,
          message:
            "Error when sending the image of the avatar that published registration of covid.",
        });
      } else {
        const result = covid[1] / pageSize;
        return res.status(200).json({
          code: 200,
          covis: covid[0],
          total: {
            totalPage: Math.round(result),
            pageNum: covid[3],
            pageSize: covid[2],
          },
        });
      }
    });
  }

  //Actualizacion del Covids
  async updateCovid(req, res) {
    const coviData = req.body;
    const { id } = req.params;
    await _covidService.updateCovid(id, coviData).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Failed to update the covid registry.",
        });
      } else {
        return res
          .status(200)
          .json({ code: 200, message: "Covid registry updated successfully." });
      }
    });
  }
}

module.exports = CovidController;
