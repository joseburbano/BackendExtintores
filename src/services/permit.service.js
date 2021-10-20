const BaseService = require("./base.service");

let _permitRepository = null;

class PermitService extends BaseService {
  constructor({ PermitRepository }) {
    super(PermitRepository);
    _permitRepository = PermitRepository;
  }

  async addPermissions(permi) {
    const { name, description } = permi;

    const currentEntity = await _permitRepository.getName(name);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "permission name already exists";
      throw error;
    }

    if (!name || !description) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "all fields must be filled.";
      throw error;
    }

    return await _permitRepository.addPermissions(permi);
  }

  //trae permisos
  async getPermissionsBring(pageSize, pageNum) {
    return await _permitRepository.getAll(pageSize, pageNum);
  }
}

module.exports = PermitService;
