let _roleService = null;

class RoleController {
  constructor({ RoleService }) {
    _roleService = RoleService;
  }

  //agregar permisos
  async addRol(req, res) {
    const rol = req.body;
    await _roleService.addRol(rol).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "Error creating role." });
      } else {
        return res.json({
          code: 200,
          message: "Rol record created Successfully.",
        });
      }
    });
  }

  //aqui en listamos para visualizar roles
  async getRolPerm(req, res) {
    const { pageSize, pageNum } = req.query;
    await _roleService.getRolPerm(pageSize, pageNum).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "Role not found." });
      } else {
        return res.json({
          code: 200,
          roles: resul,
        });
      }
    });
  }

  //actualizar rol y los menus
  async updateRolMenu(req, res) {
    const { idRol, idPermi } = req.body;
    await _roleService.updateRolMenu(idRol, idPermi).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "Error assigning permission." });
      } else {
        return res.json({
          code: 200,
          message: "Assigned Permission Created Successfully.",
        });
      }
    });
  }

  //elminar rol y permiso al tiempo
  async deleteRolPermi(req, res) {
    const { id } = req.params;
    await _roleService.deleteRolPermi(id).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "Role data not found." });
      } else {
        return res.json({
          code: 200,
          message: "The role has been successfully removed.",
        });
      }
    });
  }

  //traer todos los permisos de rol
  async getAcordingToUserRoles(req, res) {
    const { name } = req.params;
    await _roleService.getAcordingToUserRoles(name).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "Role data not found." });
      } else {
        return res.json({
          code: 200,
          permi: resul,
        });
      }
    });
  }

  //traer permiso segun su rol y menus
  async getRoleBasedMenu(req, res) {
    const { name } = req.params;
    await _roleService.getRoleBasedMenu(name).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "Role data not found." });
      } else {
        return res.json({
          code: 200,
          menus: resul,
        });
      }
    });
  }
}
module.exports = RoleController;
