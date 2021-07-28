const Menu = require("../../models/Menu");
const Roles = require("../../models/Role");
const Permisos = require("../../models/Permissions");
const { populate } = require("../../models/Menu");
const { query } = require("express");

exports.addPermisos = async (req, res) => {
  try {
    const body = req.body;
    const Permi = new Permisos(body);
    await Permi.save((err, rolStored) => {
      if (err) {
        res
          .status(500)
          .json({ code: 500, message: "Registro de permisos ya existe." });
      } else {
        if (!rolStored) {
          res.status(404).json({
            code: 404,
            message: "Error al crear permiso.",
          });
        } else {
          res.status(200).json({
            code: 200,
            message: "Registro de permisos creado Correctamente.",
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

exports.addRoles = async (req, res) => {
  try {
    const body = req.body;
    const Role = new Roles(body);
    await Role.save((err, rolStored) => {
      if (err) {
        res
          .status(500)
          .json({ code: 500, message: "Registro de Menu ya existe." });
      } else {
        if (!rolStored) {
          res.status(404).json({
            code: 404,
            message: "Error al crear menu.",
          });
        } else {
          res.status(200).json({
            code: 200,
            message: "Registro de menu creado Correctamente.",
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

exports.addMenu = async (req, res) => {
  try {
    const body = req.body;
    const Menus = new Menu(body);
    await Menus.save((err, menuStored) => {
      if (err) {
        res
          .status(500)
          .json({ code: 500, message: "Registro de Menu ya existe." });
      } else {
        if (!menuStored) {
          res.status(404).json({
            code: 404,
            message: "Error al crear menu.",
          });
        } else {
          res.status(200).json({
            code: 200,
            message: "Registro de menu creado Correctamente.",
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

//aqui en listamos para visualizar roles
exports.getRolesPerm = (req, res) => {
  Roles.find((err, rolStored) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!rolStored) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun rol." });
      } else {
        res.status(200).send({ code: 200, roles: rolStored });
      }
    }
  });
};

//aqui en listamos para visualizar permisos
exports.getPermisosTraer = (req, res) => {
  Permisos.find((err, permisosTraer) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor." });
    } else {
      if (!permisosTraer) {
        res
          .status(404)
          .send({ code: 404, message: "No se ha encontrado ningun menus." });
      } else {
        res.status(200).send({ code: 200, permisos: permisosTraer });
      }
    }
  });
};

exports.actualizarRoleMenu = async (req, res) => {
  try {
    const body = req.body;
    const idRol = body.idRol;
    const idPermi = body.idPermi;

    Permisos.findById({ _id: idPermi }, (err, permiStored) => {
      if (err) {
        res.status(500).json({ message: "Erro al consular pemrisos." });
      } else {
        if (!permiStored) {
          res.status(404).json({
            message: "Error crear comprovación de existencia del Permisos.",
          });
        } else {
          Roles.exists(
            { _id: idRol, permission: permiStored._id },
            (err, rolesPerStored) => {
              if (err) {
                res.status(500).json({
                  message: "Error al comprovar relacion al rol",
                });
              } else {
                if (rolesPerStored) {
                  res
                    .status(404)
                    .json({ message: "Ya esa relacion a sido asignada." });
                } else {
                  Roles.findByIdAndUpdate(
                    idRol,
                    {
                      $push: {
                        permission: permiStored._id,
                        menus: permiStored.menu,
                      },
                    },
                    (err, rolesPermiStored) => {
                      if (err) {
                        res.status(500).json({
                          message: "Error al agregar roleacion al rol",
                        });
                      } else {
                        if (!rolesPermiStored) {
                          res.status(404).json({
                            message: "Error al crear crear relación.",
                          });
                        } else {
                          res.status(200).json({
                            code: 200,
                            message: "Permiso Asignado Creado Correctamente.",
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
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: "Error del servidor.",
    });
  }
};

//eliminar el rol
exports.deleteRolesPermi = (req, res) => {
  const { id } = req.params;

  Roles.findByIdAndRemove(id, (err, partiDeleted) => {
    if (err) {
      res.status(500).json({ message: "Error del servidor." });
    } else {
      if (!partiDeleted) {
        res.status(404).json({
          message: "datos del rol no encontrado",
        });
      } else {
        res
          .status(200)
          .json({ message: "El rol se ha eliminado correctamente." });
      }
    }
  });
};

//traer permisos segun los roles
exports.getSegunRolesUser = (req, res) => {
  const { name } = req.params;
  Roles.findOne({ name: name })
    .populate("permission")
    .exec((err, rolesStored) => {
      if (err) {
        res.status(500).json({ message: "Error del servidor" });
      } else {
        if (!rolesStored) {
          res.status(404).json({
            message: "Datos del rol no encontrado.",
          });
        } else {
          res.status(200).json({ code: 200, permi: rolesStored });
        }
      }
    });
};

//traer menus segun los roles
exports.getMenuSegunRoles = (req, res) => {
  const { name } = req.params;
  Roles.findOne({ name: name })
    .populate({
      path: "menus",
    })
    .exec((err, rolesStored) => {
      if (err) {
        res.status(500).json({ message: "Error del servidor" });
      } else {
        if (!rolesStored) {
          res.status(404).json({
            message: "Datos del rol no encontrado.",
          });
        } else {
          res.status(200).json({ code: 200, menus: rolesStored });
        }
      }
    });
};
