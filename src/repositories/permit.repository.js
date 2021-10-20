const BaseRepository = require("./base.repository");

let _permissions = null;

class PermitRepository extends BaseRepository {
  constructor({ Permissions }) {
    super(Permissions);
    _permissions = Permissions;
  }

  //buscar si nombre de permiso ya existe
  async getName(name) {
    return await _permissions.findOne({ name: name }).exec();
  }

  //Agregar permiso
  async addPermissions(permi) {
    return await _permissions.create(permi);
  }
}

module.exports = PermitRepository;
