const BaseService = require("./base.service");
const slug = require("slug");
const fs = require("fs");
const path = require("path");

let _participationRepository = null;

class ParticipationService extends BaseService {
  constructor({ ParticipationRepository }) {
    super(ParticipationRepository);
    _participationRepository = ParticipationRepository;
  }

  //agregar registro de normativa de participacion
  async addParticipation(dataPart, userId) {
    const Urll = dataPart.claseRiesgoLocativo;
    const url = slug(Urll).toLowerCase();

    dataPart.url = `${url}-${shortid.generate()}`;
    const active = dataPart.active;
    active = true;
    dataPart.active = active;
    const estado = dataPart.estado;
    estado = false;
    dataPart.estado = estado;

    const currentEntity = await _participationRepository.get(userId);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message =
        "The user does not exist therefore you will not be able to make this registration.";
      throw error;
    }

    dataPart.user = currentEntity;

    if (dataPart.user) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Error appending user data to item.";
      throw error;
    }

    const currentSaveParti = await _participationRepository.create(dataPart);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Error when saving the Participatory Regulations record.";
      throw error;
    }

    currentEntity.participas.push(currentSaveParti._id);

    return await _participationRepository.createPartiUser(currentEntity);
  }

  //eliminar registro de normativa de participacion
  async deleteParticipation(partiId) {
    const currentEntity = await _participationRepository.get(partiId);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message =
        "The user does not exist therefore you will not be able to make this registration.";
      throw error;
    }

    const { user } = currentEntity;

    const currentUpdate = _participationRepository.updateUserPartId(
      user,
      partiId,
    );

    if (currentUpdate) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message =
        "Error when searching registration of participation regulations.";
      throw error;
    }

    return await _participationRepository.delete(partiId);
  }

  //Actualizar registro de normativa de participacion
  async updateParticipation(partiData, id) {
    if (partiData || id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "You need the id and the data.";
      throw error;
    }

    return await _participationRepository.update(id, partiData);
  }

  //Subir foto al servidor y enlasarlo al registro de normativa de participacion
  async uploadParticipation(id, fileArchi) {
    if (id || fileArchi) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "You need the id.";
      throw error;
    }

    const partiData = await _participationRepository.get(id);

    if (partiData) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message =
        "The user does not exist therefore you will not be able to make this registration.";
      throw error;
    }

    let filePath = fileArchi.avatar.path;
    let fileSplit = filePath.split("/");
    let fileNames = fileSplit[2];
    let extSplit = fileNames.split(".");
    var fileExt = extSplit[1];

    if (fileExt !== "png" && fileExt !== "jpg" && fileExt !== "jpeg") {
      const error = new Error();
      error.status = 400;
      error.code = 400;
      error.message =
        "The image extension is not valid. (Allowed extensions: .png and .jpg.";
      throw error;
    }

    partiData.avatar = fileNames;

    return await _participationRepository.update(id, partiData);
  }

  //Enviar un foto al registro de normativa de participacion el del avatar el que lo reporto
  async getPhotoParticipationAvatar(avatarName) {
    const filePath = "./uploads/avatar/" + avatarName;

    if (avatarName) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "(Avatar) Error extracting the id of the image.";
      throw error;
    }

    fs.existsSyncs(filePath, (exists) => {
      if (!exists) {
        const error = new Error();
        error.code = 404;
        error.status = 404;
        error.message = "The avatar you are looking for does not exist.";
        throw error;
      }
    });

    return await path.resolve(filePath);
  }

  //Enviar un foto al registro de normativa de participacion
  async getPhotoShare(fotoName) {
    const filePath = "./uploads/NormativaImagen/" + fotoName;

    if (fotoName) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Error extracting the id of the image.";
      throw error;
    }

    fs.existsSync(filePath, (exists) => {
      if (!exists) {
        const error = new Error();
        error.code = 404;
        error.status = 404;
        error.message = "The photo you are looking for does not exist.";
        throw error;
      }
    });

    return await path.resolve(filePath);
  }

  //enviar todos los registro de normativa de participacion
  async getParticipation(pageSize, pageNum) {
    return await _participationRepository.getAllParticipation(
      pageSize,
      pageNum,
    );
  }

  //enviar un solo registro de normativa de participacion
  async getCompetitor(url) {
    if (url) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Error when extracting url.";
      throw error;
    }

    return await _participationRepository.getParticipation(url);
  }

  //enviar todos los registro de normativa de participacion para exportar a excel
  async exportShare() {
    return await _participationRepository.exportShare();
  }

  //NO EN FUNCIONAMIENTO
  //funcion para traer todos los datos registrados por el usuario un usuario
  async participantRegisteredUser(id) {
    if (id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Error when extracting id.";
      throw error;
    }

    return await _participationRepository.participantRegisteredUser(id);
  }
  //NO EN FUNCIONAMIENTO
  //enviar un solo registro de normativa de participacion
  async registeredParticipantUser(id) {
    if (id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Error when extracting id.";
      throw error;
    }

    return await _participationRepository.registeredParticipantUser(id);
  }
}

module.exports = ParticipationService;
