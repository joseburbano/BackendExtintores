const BaseRepository = require("./base.repository");

let _covid = null;
let _user = null;

class CovidRepository extends BaseRepository {
  constructor({ Covid, User }) {
    super(Covid, User);
    _covid = Covid;
    _user = User;
  }

  //buscar si usuario existe
  async getCovidUser(id) {
    return await _user.findById(id).exec();
  }

  //actualizar datos de usuario
  async covidUserUpdate(id, entity) {
    return await _user.findByIdAndUpdate(id, { covids: entity });
  }

  //actualizar datos de usuario para eliminar registro de covid
  async covidUserUpdateDelete(id, entity) {
    return await _user.findByIdAndUpdate(entity.user, {
      $pull: { covids: id },
    });
  }

  //enviar un  registro de covid por busqueda por url
  async getCovi(url) {
    return await _covid
      .findOne({ url: url })
      .populate({
        path: "user",
        select: ["fullname", "tipo", "avatar", "cedula"],
      })
      .exec();
  }

  //aqui en listamos para exportar a excel
  async exportExcelCovid() {
    return await _covid.find({}).exec();
  }

  //traer datos  por grupitos de a 10 de normativa de particiapacion
  async getAllCovid(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    let doc = await _covid
      .find({})
      .populate({
        path: "user",
        select: ["fullname", "tipo", "avatar", "cedula"],
      })
      .skip(skips)
      .limit(pageSize)
      .exec();

    const elements = await _covid.countDocuments().exec();

    return [doc, elements, pageSize, pageNum];
  }
}

module.exports = CovidRepository;
