const Covid = require("../../../models/Covid");
const User = require("../../../models/Users");
const moment = require("moment");
//slug para y shor id generar url
const slug = require("slug");
const shortid = require("shortid");

exports.addCovid = async (req, res) => {
  try {
    const body = req.body;
    
    Url = body.diagnosticoCovid;
    const url = slug(Url).toLowerCase();
    body.url = `${url}-${shortid.generate()}`;
    active = body.active;
    active = true;
    body.active = active;
    estado = body.estado;
    estado = true;
    body.estado = estado;
    fechaCreate = moment();
    body.fechaCreate = fechaCreate;
    const Covids = new Covid(body);

    const user = await User.findById(req.params.id);
    Covids.user = user;
    await Covids.save((err, covidStored) => {
      if (err) {
        res
          .status(500)
          .json({ code: 500, message: "Registro de Covid ya existe." });
      } else {
        if (!covidStored) {
          res.status(404).json({
            code: 404,
            message: "Error al crear formulario de covid.",
          });
        } else {
          user.covids.push(Covids._id);
          user.save((err, userStored) => {
            if (err) {
              res.status(500).json({
                message: "El Registro ya esta registrado con un usuario",
              });
            } else {
              if (!userStored) {
                res.status(404).json({
                  message: "Error al crear el registro en el usuario.",
                });
              } else {
                res.status(200).json({
                  code: 200,
                  message: "Registro creado Correctamente.",
                });
              }
            }
          });
        }
      }
    });
  } catch (e) {
    res.status(500).json({
      code: 500,
      message: "Error agregar",
    });
  }
};