const Covid = require("../../../models/Covid");
const User = require("../../../models/Users");

//aqui en listamos para visualizar Covids
exports.getCovids = (req, res) => {
  const { page = 1, limit = 1 } = req.query;
  const options = {
    page,
    limit: parseInt(limit),
    sort: { date: "desc" },
    populate: {
      path: "user",
      select: ["fullname", "tipo", "avatar", "cedula"],
    },
  };

  Covid.paginate({}, options, (err, covidStored) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!covidStored) {
        res.status(404).json({
          code: 404,
          message: "No se ha encontrado ningun registro de covid.",
        });
      } else {
        res.status(200).json({ code: 200, covis: covidStored });
      }
    }
  });
};
