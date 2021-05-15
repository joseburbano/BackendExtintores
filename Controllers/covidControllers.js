const Covid = require("../models/Covid");
const User = require("../models/Users");
const moment = require("moment");
//slug para y shor id generar url
const slug = require("slug");
const shortid = require("shortid");
const fs = require("fs");
const path = require("path");

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
          console.log(covidStored);
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

//aqui en listamos para exportar a excel
exports.exportarCovid = (req, res) => {
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

//funcion para recuperar nuestro backend para el avatar y envia la foto al frontend envia imagen a usuario
exports.getAvatar = (req, res) => {
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};
