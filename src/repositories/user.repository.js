const BaseRepository = require("./base.repository");

let _user = null;

class UserRepository extends BaseRepository {
  constructor({ User }) {
    super(User);
    _user = User;
  }

  async getUserByUsername(email, cedula) {
    return await _user.find({ email: email, cedula: cedula });
  }

  async getUserByEmail(email) {
    return await _user.findOne({ email: email });
  }
  //usuarios activo o inactivos
  async getUsersActive(pageSize = 5, pageNum = 1, active) {
    const skips = pageSize * (pageNum - 1);
    const doc = await _user
      .find({ active: active })
      .skip(skips)
      .limit(pageSize)
      .exec();

    const user = await _user.countDocuments({ active: active }).exec();

    return [doc, user];
  }
  //actualizar foto de avatar
  async uploadAvatar(userId, fileNames) {
    await _user.findByIdAndUpdate(userId, { avatar: fileNames }).exec();
  }

  //activar usuario
  async activateUser(userId, active) {
    return await _user.findByIdAndUpdate(userId, { active: active });
  }

  //eliminar usuario
  async deleteUser(userId) {
    return await _user.findByIdAndRemove(userId);
  }
}

module.exports = UserRepository;
