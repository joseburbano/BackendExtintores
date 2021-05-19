const Covid = require("../../models/Covid");
const User = require("../../models/Users");


//aqui en listamos para exportar a excel
exports.BuscarCovid = (req, res) => {
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



//funcion para traer todos los datos registrados por el usuario un usuario
exports.covidRegistradoUser = async (req, res) => {
  const { _id } = req.params;
  await User.findById(_id)
    .populate("covids")
    .exec((err, partici) => {
      if (err) {
        res.status(500).json({ code: 500, message: "Error del servidor." });
      } else {
        if (!partici) {
          res.status(404).json({ code: 404, message: "No se encontro nada." });
        } else {
          res.status(200).json({ code: 200, covidUsers: partici });
        }
      }
    });
};

//funcion para traer covid con los datos del usuario que lo registro
exports.RegistradoCovidUser = async (req, res) => {
  const { _id } = req.params;
  await Covid.findById(_id)
    .populate("users")
    .exec((err, part) => {
      if (err) {
        res.status(500).json({ code: 500, message: "Error del servidor." });
      } else {
        if (!part) {
          res.status(404).json({ code: 404, message: "No se encontro nada." });
        } else {
          console.log(part);
        }
      }
    });
};
