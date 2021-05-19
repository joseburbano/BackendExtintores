const Covid = require("../../../models/Covid");

//extraemos los datos d un solo Covids
exports.getCovi = (req, res) => {
  const { url } = req.params;

  Covid.findOne({ url })
    .populate({
      path: "user",
      select: ["fullname", "tipo", "avatar", "cedula"],
    })
    .exec((err, covidStored) => {
      if (err) {
        res.status(500).json({ code: 500, message: "Error del servidor." });
      } else {
        if (!covidStored) {
          res.status(404).json({
            code: 404,
            message: "No se ha encontrado ningun formulario de covid.",
          });
        } else {
          const gh = covidStored.user.avatar;

          res.status(200).json({
            code: 200,
            covi: covidStored,
            avatar: gh,
          });
        }
      }
    });
};
