const BaseService = require("./base.service");

let _roleRepository = null;

class RoleService extends BaseService {
  constructor({ RoleRepository }) {
    super(RoleRepository);
    _roleRepository = RoleRepository;
  }

  async addRol(rol) {
    const { name } = rol;

    const currentEntity = await _roleRepository.getRol(name);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Rol name already exists";
      throw error;
    }

    if (!name) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "all fields must be filled.";
      throw error;
    }

    return await _roleRepository.create(rol);
  }

  //trael roles
  async getRolPerm(pageSize, pageNum) {
    return await _roleRepository.getAll(pageSize, pageNum);
  }

  //actualizar rol
  async updateRolMenu(idRol, idPermi) {
    const currentEntit = await _roleRepository.getIdPermi(idPermi);

    if (currentEntit) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Permission does not exist.";
      throw error;
    }

    const { idPermi: _id, menu } = currentEntit;

    const currentEntity = await _roleRepository.existsIdRol(idRol, idPermi);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "That relationship has already been assigned.";
      throw error;
    }

    return await _roleRepository.updateRol(idRol, idPermi, menu);
  }

  //eliminar rol
  async deleteRolPermi(id) {
    if (!id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Identifier is required.";
      throw error;
    }

    return await _roleRepository.deleteRol(id);
  }

  //traer permisos del rol
  async getAcordingToUserRoles(name) {
    if (!name) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Name is required.";
      throw error;
    }

    return await _roleRepository.getAcordingToUserRoles(name);
  }

  //traer rol y los menus
  async getRoleBasedMenu(name) {
    if (!name) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Name is required.";
      throw error;
    }

    return await _roleRepository.getRoleBasedMenu(name);
  }
}

module.exports = RoleService;
