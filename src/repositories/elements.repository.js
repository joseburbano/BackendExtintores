const BaseRepository = require("./base.repository");

let _elements = null;
let _user = null;

class ElementsRepository extends BaseRepository {
  constructor({ Elements, User }) {
    super(Elements, User);
    _elements = Elements;
    _user = User;
  }

  //buscar user
  async getIdUser(id) {
    return await _user.findById(id).exec();
  }

  //buscar usuario y eliminar registro de elemento
  async updateUserelementsId(user, id) {
    return await _user.findByIdAndUpdate(user, {
      $pull: { elementos: id },
    });
  }

  //traer datos  por sedes de elementos
  async getAllElementsCampus(campus, pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await _elements.find({ sede: campus }).skip(skips).limit(pageSize);
  }

  //traer datos  por bloque de elementos
  async getElementsQueryBlock(campus, block, pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await _elements
      .find({ sede: campus, ubicacionBloque: block })
      .skip(skips)
      .limit(pageSize);
  }

  //traer datos  por piso de elementos
  async getElementsQueryBlockFlat(
    campus,
    block,
    flat,
    pageSize = 5,
    pageNum = 1,
  ) {
    const skips = pageSize * (pageNum - 1);
    return await _elements
      .find({ sede: campus, ubicacionBloque: block, ubicacionPiso: flat })
      .skip(skips)
      .limit(pageSize);
  }

  //buscar si nombre de permiso ya existe
  async getUrl(url) {
    return await _elements.findOne({ url: url }).exec();
  }

  //Atreaer datos e usuario y elementos
  async userRegisteredItem(id) {
    return await _user.findById(_id).populate("elementos").exec();
  }

  //Traer elemento y datos del usuario
  async userRegistrationElement(id) {
    return await _elements.findById(_id).populate("users").exec();
  }

  //traer un solo registro de normativa de particiapacion
  async exportShareElements() {
    return await _elements.find().exec();
  }
}

module.exports = ElementsRepository;
