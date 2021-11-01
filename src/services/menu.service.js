const BaseService = require("./base.service");

let _menuRepository = null;

class MenuService extends BaseService {
  constructor({ MenuRepository }) {
    super(MenuRepository);
    _menuRepository = MenuRepository;
  }

  async addMenu(menu) {
    const { key, url, icon, span, active } = menu;

    const currentEntity = await _menuRepository.getKey(key);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message =
        "Password or number is already in the database please change number or key.";
      throw error;
    }

    if (!key || !url || !icon || !span || !active) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "Data is missing please check that all data is full.";
      throw error;
    }

    return await _menuRepository.create(menu);
  }
}

module.exports = MenuService;
