const Covid = require("../../../models/Covid");


//aqui en listamos para exportar a excel
exports.exportExcelCovid = (req, res) => {
  Covid.find({}, (err, covi) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!covi) {
        res.status(404).json({
          code: 404,
          message: "No se a encontrado ningun registro de covid.",
        });
      } else {
        res.status(200).json({ code: 200, totalCovid: covi });
      }
    }
  });
};
