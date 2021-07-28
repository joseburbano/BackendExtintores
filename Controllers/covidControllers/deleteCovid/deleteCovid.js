const Covid = require("../../../models/Covid");
const User = require("../../../models/Users");

exports.deleteCovid = (req, res) => {
    const { id } = req.params;
  
    Covid.findOne({ _id: id }, (err, coviStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!coviStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ningun registro de covid.",
          });
        } else {
          User.findByIdAndUpdate(
            coviStored.user,
            {
              $pull: { covids: id },
            },
            (err, coviUpdate) => {
              if (err) {
                res
                  .status(500)
                  .json({ code: 500, message: "Error del servidor." });
              } else {
                if (!coviUpdate) {
                  res.status(404).json({
                    code: 400,
                    message: "No se ha encontrado ningun registro de covid.",
                  });
                } else {
                  Covid.findByIdAndRemove(id, (err, covidDeleted) => {
                    if (err) {
                      res.status(500).json({ message: "Error del servidor." });
                    } else {
                      if (!covidDeleted) {
                        res.status(404).json({
                          code: 404,
                          message: "Datos de formulario de covid no encontrado",
                        });
                      } else {
                        res.status(200).json({
                          code: 200,
                          message: "Se ha eliminado correctamente.",
                        });
                      }
                    }
                  });
                }
              }
            }
          );
        }
      }
    });
  };