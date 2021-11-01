let _permitService = null;

class PermitController {
  constructor({ PermitService }) {
    _permitService = PermitService;
  }

  //agregar permisos
  async addPermissions(req, res) {
    const permi = req.body;
    await _permitService.addPermissions(permi).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "No permit found." });
      } else {
        return res.json({
          code: 200,
          message: "Permission record created Successfully.",
        });
      }
    });
  }

  //traer permisos
  async getPermissionsBring(req, res) {
    const { pageSize, pageNum } = req.query;
    await _permitService
      .getPermissionsBring(pageSize, pageNum)
      .then((resul) => {
        if (!resul) {
          return res.json({ code: 401, message: "No permit found." });
        } else {
          return res.json({
            code: 200,
            permisos: resul,
          });
        }
      });
  }
}
module.exports = PermitController;
