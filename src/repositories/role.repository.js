const BaseRepository = require("./base.repository");

let _role = null;
let _permissions = null;

class RoleRepository extends BaseRepository {
  constructor({ Role, Permissions }) {
    super(Role, Permissions);
    _role = Role;
    _permissions = Permissions;
  }

  //buscar si nombre de permiso ya existe
  async getRol(name) {
    return await _role.findOne({ name: name }).exec();
  }

  //Agregar permiso
  async addPermissions(permi) {
    return await _role.create(permi);
  }

  async getIdPermi(idPermi) {
    return await _permissions.findById(idPermi);
  }
  //comprobar que existen
  async existsIdRol(idRol, idPermi) {
    return await _role.exists({ _id: idRol, permission: idPermi });
  }

  async updateRol(idRol, idPermi, menu) {
    return await _role.findByIdAndUpdate(idRol, {
      $push: {
        permission: idPermi,
        menus: menu,
      },
    });
  }
  //elminar dato
  async deleteRol(id) {
    await this.model.findByIdAndRemove(id);
  }

  //traer datos de role con permisos
  async getAcordingToUserRoles(name) {
    return await _role.findOne({ name: name }).populate("permission").exec();
  }
  ////traer rol y los menus
  async getRoleBasedMenu(name) {
    return await _role
      .findOne({ name: name })
      .populate({
        path: "menus",
      })
      .exec();
  }
}
module.exports = RoleRepository;
