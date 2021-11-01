const BaseRepository = require("./base.repository");

let _user = null;
let _covid = null;
let _participation = null;
let _elements = null;

class PermitRepository extends BaseRepository {
  constructor({ User, Covid, Participation, Elements }) {
    super(User, Covid, Participation, Elements);
    _user = User;
    _covid = Covid;
    _participation = Participation;
    _elements = Elements;
  }

  //contar cuantos datos tenemos en usuarios
  async countUser() {
    return await _user.estimatedDocumentCount();
  }

  //contar cuantos datos tenemos en elementos o extintores
  async countElement() {
    return await _elements.find().exec();
  }
  //contar cuantos datos tenemos en usuarios
  async stateElementWell() {
    return await _elements.find({ estado: "bueno" }).exec();
  }

  //contar cuantos datos tenemos en usuarios
  async stateElementBad() {
    return await _elements.find({ estado: "malo" }).exec();
  }

  //contar registros de covid
  async countCovid() {
    return await _covid.estimatedDocumentCount();
  }

  //contar cuantos datos tenemos en usuarios
  async countParticiBab() {
    return await _participation.find({ estado: "false" }).exec();
  }

  //contar cuantos datos covid temperatura superior a 38
  async countCovidTrein() {
    return await _covid
      .find({
        temperatura: {
          $gte: 38,
        },
      })
      .exec();
  }
}

module.exports = PermitRepository;
