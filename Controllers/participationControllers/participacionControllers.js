const Participacion = require("../../models/Participacion");
const User = require("../../models/Users");
const moment = require("moment");
//slug para y shor id generar url
const slug = require("slug");
const shortid = require("shortid");
//avatar
const fs = require("fs");
const path = require("path");

exports.addParticipacion = async (req, res) => {
  try {
    const body = req.body;
    Url = body.claseRiesgoLocativo;
    const url = slug(Url).toLowerCase();

    body.url = `${url}-${shortid.generate()}`;
    active = body.active;
    active = true;
    body.active = active;
    estado = body.estado;
    estado = false;
    body.estado = estado;

    fechaCreate = moment();
    body.fechaCreate = fechaCreate;

    const Participacions = new Participacion(body);

    const user = await User.findById(req.params.id);

    Participacions.user = user;
    await Participacions.save((err, partiStored) => {
      if (err) {
        res.status(500).json({ message: "El Elemento ya existe." });
      } else {
        if (!partiStored) {
          res.status(404).json({ message: "Error al crear Elemento." });
        } else {
          user.participas.push(Participacions._id);
          user.save((err, userStored) => {
            if (err) {
              res
                .status(500)
                .json({ message: "El Elemento ya registrado con un usuario" });
            } else {
              if (!userStored) {
                res
                  .status(404)
                  .json({ message: "Error al crear elemento y usuario." });
              } else {
                res.status(200).json({
                  code: 200,
                  iduser: partiStored._id,
                  message: "Elemento Creado Correctamente.",
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

//funcion para subir el avatar o imagen al servidor
exports.uploadParticipacion = (req, res) => {
  const params = req.params;
  Participacion.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!userData) {
        res.status(404).json({
          code: 404,
          message: "No se ha encontrado ningun dato de participancion.",
        });
      } else {
        let partici = userData;
        console.log(req.files);
        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("/");
          let fileNames = fileSplit[2];
          let extSplit = fileNames.split(".");
          var fileExt = extSplit[1];
          if (fileExt !== "png" && fileExt !== "jpg" && fileExt !== "jpeg") {
            res.status(400).json({
              code: 400,
              message:
                "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)",
            });
          } else {
            partici.avatar = fileNames;
            Participacion.findByIdAndUpdate(
              { _id: params.id },
              partici,
              (err, particiResult) => {
                if (err) {
                  res
                    .status(500)
                    .json({ code: 500, message: "Error del servidor." });
                } else {
                  if (!particiResult) {
                    res.status(404).json({
                      code: 404,
                      message:
                        "No se ha encontrado ningun foto del formulario de normativa de participación.",
                    });
                  } else {
                    res.status(200).json({ code: 200, avatarName: fileNames });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
};

//funcion para recuperar nuestro backend para el avatar y envia la foto al frontend envia imagen a usuario
exports.getFotoParticipacionAvatar = (req, res) => {
  const avatarName = req.params.fotoName;
  const filePath = "./uploads/avatar/" + avatarName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res
        .status(404)
        .json({ code: 404, message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

//funcion para recuperar nuestro backend para el avatar y envia la foto al frontend envia imagen a usuario
exports.getFotoParticipacion = (req, res) => {
  const fotoName = req.params.fotoName;
  const filePath = "./uploads/NormativaImagen/" + fotoName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res
        .status(404)
        .json({ code: 404, message: "El avatar que buscas no existe." });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

//aqui en listamos para visualizar participacion
exports.getParticipacion = (req, res) => {
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
  Participacion.paginate({}, options, (err, partiStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!partiStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ningun dato de participación.",
        });
      } else {
        res.status(200).send({ code: 200, participaciones: partiStored });
      }
    }
  });
};

//Actualizacion del participacion
exports.updateParticipacion = (req, res) => {
  const partiData = req.body;
  const { id } = req.params;
  Participacion.findByIdAndUpdate(id, partiData, (err, partiUpdate) => {
    if (err) {
      res.status(500).json({ code: 500, message: "Error del servidor." });
    } else {
      if (!partiUpdate) {
        res.status(404).json({
          code: 400,
          message: "No se ha encontrado ningun dato de participacion.",
        });
      } else {
        res.status(200).json({
          code: 200,
          message:
            "Dato en normativa de participación actualizado correctamente.",
        });
      }
    }
  });
};

exports.deleteParticipacion = (req, res) => {
  const { id } = req.params;
  Participacion.findOne({ _id: id }, (err, postStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!postStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ningun dato de participacion.",
        });
      } else {
        User.findByIdAndUpdate(
          postStored.user,
          {
            $pull: { participas: id },
          },
          (err, particiUpdate) => {
            if (err) {
              res
                .status(500)
                .json({ code: 500, message: "Error del servidor." });
            } else {
              if (!particiUpdate) {
                res.status(404).json({
                  code: 400,
                  message: "No se ha encontrado ningun dato de participacion.",
                });
              } else {
                Participacion.findByIdAndRemove(id, (err, partiDeleted) => {
                  if (err) {
                    res.status(500).json({ message: "Error del servidor." });
                  } else {
                    if (!partiDeleted) {
                      res.status(404).json({
                        message:
                          "Datos de normativa de participacion no encontrado",
                      });
                    } else {
                      res
                        .status(200)
                        .json({ message: "Se ha eliminado correctamente." });
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

//aqui en listamos para visualizar participacion
exports.getParticipantes = (req, res) => {
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
  Participacion.paginate({}, options, (err, partStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!partStored) {
        res.status(404).send({
          code: 404,
          message: "No se ha encontrado ningun participante.",
        });
      } else {
        res.status(200).send({ code: 200, participantes: partStored });
      }
    }
  });
};

//extraemos los datos d un solo participacion
exports.getParticipante = (req, res) => {
  const { url } = req.params;

  Participacion.findOne({ url })
    .populate({
      path: "user",
      select: ["fullname", "tipo", "avatar", "cedula"],
    })
    .exec((err, participanteStored) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor." });
      } else {
        if (!participanteStored) {
          res.status(404).send({
            code: 404,
            message: "No se ha encontrado ningun dato de una participación.",
          });
        } else {
          const fg = participanteStored.avatar;
          res.status(200).send({
            code: 200,
            participante: participanteStored,
            avatar: fg,
          });
        }
      }
    });
};

//aqui en listamos para exportar a excel
exports.exportarParticipacion = (req, res) => {
  Participacion.find({}, (err, parti) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!parti) {
        res.status(404).json({
          code: 404,
          message: "No se a encontrado ningun registro de participacion.",
        });
      } else {
        res.status(200).json({ code: 200, totalParti: parti });
      }
    }
  });
};

//funcion para traer todos los datos registrados por el usuario un usuario
exports.particiRegistradoUser = async (req, res) => {
  const { _id } = req.params;
  await User.findById(_id)
    .populate("participas")
    .exec((err, partici) => {
      if (err) {
        res.status(500).json({ code: 500, message: "Error del servidor." });
      } else {
        if (!partici) {
          res.status(404).json({ code: 404, message: "No se encontro nada." });
        } else {
          res.status(200).json({ code: 200, participacionUsers: partici });
        }
      }
    });
};

//funcion para traer elemento con los datos del usuario que lo registro
exports.RegistradoPartiUser = async (req, res) => {
  const { _id } = req.params;
  await Participacion.findById(_id)
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
