let _menuService = null;

class MenuController {
  constructor({ MenuService }) {
    _menuService = MenuService;
  }

  //agregar permisos
  async addMenu(req, res) {
    const menu = req.body;

    await _menuService.addMenu(menu).then((menu) => {
      if (!menu) {
        return res.json({ code: 401, message: "No menu found." });
      } else {
        return res.json({
          code: 200,
          message: "Menu record created Successfully.",
        });
      }
    });
  }
}
module.exports = MenuController;
