const extintor = require("../../models/Elemento");
const usuario = require("../../models/Users");
const Covid = require("../../models/Covid");
const Participacion = require("../../models/Participacion");
const moment = require("moment");

//contar datos de inicio
exports.datosInicio = (req, res) => {
  const { fecha } = req.params;
  var contador = 0;
  var contadora = 0;

  usuario.find({}, (err, users) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      const cantidaduser = users.length;
      if (!users) {
        res
          .status(404)
          .json({ code: 404, message: "No se a encontrado ningun usuario." });
      } else {
        extintor.find({}, (err, extintores) => {
          if (err) {
            res.status(500).send({ code: 500, message: "Error del servidor." });
          } else {
            const cantidad = extintores.length;
            if (!extintores) {
              res.status(404).json({
                code: 404,
                message: "No se a encontrado ningun extintor.",
              });
            } else {
              extintor.find(
                { estado: "bueno"},
                (err, extintores) => {
                  if (err) {
                    res
                      .status(500)
                      .send({ code: 500, message: "Error del servidor." });
                  } else {
                    const cantidadbueno = extintores.length;
                    if (!extintores) {
                      res.status(404).json({
                        code: 404,
                        message: "No se a encontrado ningun extintor.",
                      });
                    } else {
                      extintor.find({ estado: "malo" }, (err, extintores) => {
                        if (err) {
                          res.status(500).send({
                            code: 500,
                            message: "Error del servidor.",
                          });
                        } else {
                          const cantidadmalos = extintores.length;
                          if (!extintores) {
                            res.status(404).json({
                              code: 404,
                              message: "No se a encontrado ningun extintor.",
                            });
                          } else {
                            extintor.find((err, extintores) => {
                              extintores.map((elemento) => {
                                var fc = moment(
                                  elemento.fechaVencimiento
                                ).format("YYYY-MM-DD");
                                result = moment(fc).diff(fecha, "days");

                                if (result <= 0) {
                                  contador = contador + 1;
                                  return contador;
                                }
                              });
                              if (err) {
                                res.status(500).send({
                                  code: 500,
                                  message: "Error del servidor.",
                                });
                              } else {
                                if (!extintores) {
                                  res.status(404).json({
                                    code: 404,
                                    message:
                                      "No se a encontrado ningun extintor.",
                                  });
                                } else {
                                  extintor.find((err, extintores) => {
                                    extintores.map((elemento) => {
                                      var fc = moment(
                                        elemento.fechaVencimiento
                                      ).format("YYYY-MM-DD");
                                      result = moment(fc).diff(fecha, "days");

                                      if (result <= 30) {
                                        contadora = contadora + 1;
                                      }
                                    });
                                    if (err) {
                                      res.status(500).send({
                                        code: 500,
                                        message: "Error del servidor.",
                                      });
                                    } else {
                                      if (!extintores) {
                                        res.status(404).json({
                                          code: 404,
                                          message:
                                            "No se a encontrado ningun extintor.",
                                        });
                                      } else {
                                        Covid.find({}, (err, covi) => {
                                          const cantidadCovid = covi.length;
                                          if (err) {
                                            res.status(500).send({
                                              code: 500,
                                              message: "Error del servidor.",
                                            });
                                          } else {
                                            if (!covi) {
                                              res.status(404).json({
                                                code: 404,
                                                message:
                                                  "No se a encontrado ningun registro de covid.",
                                              });
                                            } else {
                                              Participacion.find(
                                                { estado: "false" },
                                                (err, participacion) => {
                                                  const cantidadParti =
                                                    participacion.length;
                                                  if (err) {
                                                    res.status(500).send({
                                                      code: 500,
                                                      message:
                                                        "Error del servidor.",
                                                    });
                                                  } else {
                                                    if (!participacion) {
                                                      res.status(404).json({
                                                        code: 404,
                                                        message:
                                                          "No se a encontrado ningun registro de covid.",
                                                      });
                                                    } else {
                                                      Covid.find(
                                                        {
                                                          temperatura: {
                                                            $gte: 38,
                                                          },
                                                        },
                                                        (err, covid) => {
                                                          const canCovi =
                                                            covid.length;
                                                          if (err) {
                                                            res
                                                              .status(500)
                                                              .send({
                                                                code: 500,
                                                                message:
                                                                  "Error del servidor.",
                                                              });
                                                          } else {
                                                            if (!covid) {
                                                              res
                                                                .status(404)
                                                                .json({
                                                                  code: 404,
                                                                  message:
                                                                    "No se a encontrado ningun registro de covid.",
                                                                });
                                                            } else {
                                                              res
                                                                .status(200)
                                                                .json({
                                                                  code: 200,
                                                                  totalExtint: cantidad,
                                                                  totalUse: cantidaduser,
                                                                  totalBueno: cantidadbueno,
                                                                  totalMalo: cantidadmalos,
                                                                  totalvencidos: contador,
                                                                  proximosvencer: contadora,
                                                                  totalCovid: cantidadCovid,
                                                                  totalnorma: cantidadParti,
                                                                  totalCo: canCovi,
                                                                });
                                                            }
                                                          }
                                                        }
                                                      );
                                                    }
                                                  }
                                                }
                                              );
                                            }
                                          }
                                        });
                                      }
                                    }
                                  });
                                }
                              }
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
      }
    }
  });
};
