const BaseRepository = require("./base.repository");

let _menu = null;

class MenuRepository extends BaseRepository {
  constructor({ Menu, Permissions }) {
    super(Menu, Permissions);
    _menu = Menu;
  }

  //buscar si nombre de permiso ya existe
  async getKey(key) {
    return await _menu.findOne({ key: key }).exec();
  }
}

module.exports = MenuRepository;
