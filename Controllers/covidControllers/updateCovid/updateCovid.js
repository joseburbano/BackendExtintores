const Covid = require("../../../models/Covid");

//Actualizacion del Covids
exports.updateCovid = (req, res) => {
    const coviData = req.body;
    const { id } = req.params;
    Covid.findByIdAndUpdate(id, coviData, (err, covidUpdate) => {
      if (err) {
        res.status(500).json({ code: 500, message: "Error del servidor." });
      } else {
        if (!covidUpdate) {
          res.status(404).json({
            code: 400,
            message: "No se ha encontrado ningun dato del registro de Covid.",
          });
        } else {
          res.status(200).json({
            code: 200,
            message: "Dato en de formulario de Covid actualizado correctamente.",
          });
        }
      }
    });
  };