const BaseRepository = require("./base.repository");

let _participation = null;
let _user = null;

class ParticipationRepository extends BaseRepository {
  constructor({ Permissions, User }) {
    super(Permissions, User);
    _participation = Permissions;
    _user = User;
  }

  //buscar usuario y eliminar registro de normativa d eparticipacion
  async updateUserPartId(user, partiId) {
    return await _user.findByIdAndUpdate(user, {
      $pull: { participas: partiId },
    });
  }

  //NO EN FUNCIONAMIENTO
  //Agregar permiso en usuario
  async createParti(data) {
    return await _participation.create(data).exec();
  }

  //Agregar permiso en usuario
  async createPartiUser(data) {
    return await _user.save(data).exec();
  }

  //traer datos  por grupitos de a 10 de normativa de particiapacion
  async getAllParticipation(pageSize = 5, pageNum = 1) {
    const skips = pageSize * (pageNum - 1);
    return await _participation
      .find()
      .populate({
        path: "user",
        select: ["fullname", "tipo", "avatar", "cedula"],
      })
      .skip(skips)
      .limit(pageSize);
  }

  //traer un solo registro de normativa de particiapacion
  async exportShare() {
    return await _participation.find({}).exec();
  }

  //NO EN FUNCIONAMIENTO
  //funcion para traer todos los datos registrados por el usuario un usuario
  async participantRegisteredUser(id) {
    return await _user.findById(id).populate("participas").exec();
  }

  //NO EN FUNCIONAMIENTO
  //funcion para traer elemento con los datos del usuario que lo registro
  async registeredParticipantUser(id) {
    return await _participation.findById(id).populate("users").exec();
  }
}

module.exports = ParticipationRepository;
