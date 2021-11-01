let _userService = null;

class UserController {
  constructor({ UserService }) {
    _userService = UserService;
  }
  //obtener un solo usuario
  async get(req, res) {
    const { userId } = req.params;
    await _userService.get(userId).then((user) => {
      if (!user) {
        return res.json({ code: 401, message: "No user found." });
      } else {
        return res.json({ code: 200, users: user });
      }
    });
  }
  //obtener todos los usuarios
  async getAll(req, res) {
    const { pageSize, pageNum } = req.query;
    await _userService.getAll(pageSize, pageNum).then((users) => {
      if (!users) {
        return res.json({ code: 401, message: "No users found." });
      } else {
        return res.json({ users });
      }
    });
  }
  //obtener usuarios activos o inactivos
  async getUsersActive(req, res) {
    const { pageSize, pageNum, active } = req.query;
    await _userService
      .getUsersActive(pageSize, pageNum, active)
      .then((users) => {
        if (!users) {
          return res.json({ code: 401, message: "No users found." });
        } else {
          const result = users[1] / pageSize;
          return res.json({
            code: 200,
            users: users[0],
            total: {
              totalPage: Math.round(result),
              pageNum: pageNum,
              pageSize: pageSize,
            },
          });
        }
      });
  }

  //funcion para subir el avatar o imagen al servidor
  async uploadAvatar(req, res) {
    const { userId } = req.params;
    let filePath = req.files;
    await _userService.uploadAvatar(userId, filePath).then((photo) => {
      if (!photo) {
        return res.json({ code: 401, message: "No users found." });
      } else if (photo) {
        return res.json({ code: 200, avatarName: photo });
      } else {
        return res.status(500).json({ code: 500, message: "Err Server." });
      }
    });
  }

  //funcion para recuperar nuestro backend para el avatar y envia la foto al frontend envia imagen a usuario
  async getAvatar(req, res) {
    const { avatarName } = req.params;
    const filePath = "./uploads/avatar/" + avatarName;
    const result = await _userService.getAvatar(filePath);
    return res.sendFile(result);
  }

  async delete(req, res) {
    const { userId } = req.params;
    const deletedUser = await _userService.delete(userId);
    return res.send(deletedUser);
  }

  //actualizamos usurario
  async updateUser(req, res) {
    let userData = req.body;
    const { userId } = req.params;

    await _userService.updateUser(userData, userId).then((user) => {
      if (!user) {
        return res.status(401).json({ code: 401, message: "No users found." });
      } else {
        return res.json({
          code: 200,
          message: "User updated successfully.",
        });
      }
    });
  }

  //activar usuario
  async activateUser(req, res) {
    let { active } = req.body;
    const { userId } = req.params;
    await _userService.activateUser(active, userId).then((user) => {
      if (!user) {
        return res.status(401).json({ code: 401, message: "No users found." });
      } else {
        return res.json({
          code: 200,
          message: "User updated successfully.",
        });
      }
    });
  }

  //eliminar usuario
  async delete(req, res) {
    const { userId } = req.params;
    await _userService.deleteUser(userId).then((user) => {
      if (!user) {
        return res.status(401).json({ code: 401, message: "No users found." });
      } else {
        return res.json({
          code: 200,
          message: "User has been successfully removed.",
        });
      }
    });
  }

  //dar de alta a susario desde administrador
  async signUpAdmin(req, res) {
    const { body } = req;
    await _userService.signUpAdmin(body).then((user) => {
      if (!user) {
        return res.status(401).json({ code: 401, message: "No users found." });
      } else {
        return res.json({
          code: 200,
          message: "User Created Successfully.",
        });
      }
    });
  }
}
module.exports = UserController;
