let _participationService = null;

class ParticipationController {
  constructor({ ParticipationService }) {
    _participationService = ParticipationService;
  }

  //agregar un registro de normativa de participacion
  async addParticipation(req, res) {
    const body = req.body;
    const { userId } = req.params;
    await _participationService.addParticipation(body, userId).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "An error occurred while trying to save the registry.",
        });
      } else {
        return res.json({
          code: 200,
          iduser: resul._id,
          message: "Register of Participation Regulations correctly saved.",
        });
      }
    });
  }

  //Eliminar un registro de normativa de participacion
  async deleteParticipation(req, res) {
    const { partiId } = req.params;
    await _participationService.deleteParticipation(partiId).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Error trying to delete the record.",
        });
      } else {
        return res.json({
          code: 200,
          message:
            "Registration of Participation Regulations satisfactorily eliminated.",
        });
      }
    });
  }

  //Actualizar un registro de normativa de participacion
  async updateParticipation(req, res) {
    const partiData = req.body;
    const { id } = req.params;
    await _participationService
      .updateParticipation(partiData, id)
      .then((resul) => {
        if (!resul) {
          return res.json({
            code: 401,
            message: "Error trying to update.",
          });
        } else {
          return res.json({
            code: 200,
            message:
              "The registration of participation regulations was updated correctly.",
          });
        }
      });
  }

  //Subir una foto al registro de normativa de participacion
  async uploadParticipation(req, res) {
    const { id } = req.params;
    const fileArchi = req.files;
    await _participationService
      .uploadParticipation(id, fileArchi)
      .then((resul) => {
        if (!resul) {
          return res.json({
            code: 401,
            message: "Error when trying to upload the image to the server.",
          });
        } else {
          return res.json({
            code: 200,
            avatarName: resul,
            message:
              "The registration of participation regulations was updated correctly.",
          });
        }
      });
  }

  //Enviar un foto al registro de normativa de participacion el del avatar el que lo reporto
  async getPhotoParticipationAvatar(req, res) {
    const avatarName = req.params.fotoName;
    await _participationService
      .getPhotoParticipationAvatar(avatarName)
      .then((resul) => {
        if (!resul) {
          return res.json({
            code: 401,
            message:
              "Error when sending the image of the avatar that published registration of participation regulations.",
          });
        } else {
          return res.sendFile(resul);
        }
      });
  }

  //Enviar un foto al registro de normativa de participacion
  async getPhotoShare(req, res) {
    const fotoName = req.params.fotoName;
    await _participationService.getPhotoShare(fotoName).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Error when sending the image of participation regulations.",
        });
      } else {
        return res.sendFile(resul);
      }
    });
  }

  //Traer todos los registros de normativa de participacion en grupos de a 10
  async getParticipation(req, res) {
    const { pageSize, pageNum } = req.query;
    await _participationService
      .getParticipation(pageSize, pageNum)
      .then((resul) => {
        if (!resul) {
          return res.json({
            code: 401,
            message:
              "Error when sending all the registers of participation regulations.",
          });
        } else {
          return res.json({
            code: 200,
            participaciones: resul,
          });
        }
      });
  }

  //Traer un solo registro de normativa de participacion
  async getCompetitor(req, res) {
    const { url } = req.params;
    await _participationService.getCompetitor(url).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message:
            "Error when sending the registers of participation regulations.",
        });
      } else {
        const photo = result.avatar;
        return res.json({
          code: 200,
          participante: result,
          avatar: photo,
        });
      }
    });
  }

  //Exportamos todo los datos de participacion
  async exportShare(req, res) {
    await _participationService.exportShare().then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message:
            "Error when sending all the registers of participation regulations.",
        });
      } else {
        return res.json({
          code: 200,
          totalParti: result,
        });
      }
    });
  }

  //NO ESTA EN FUNCIONAMIENTO
  //funcion para traer todos los datos registrados por el usuario un usuario
  async participantRegisteredUser(req, res) {
    const { id } = req.params;
    await _participationService.participantRegisteredUser(id).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message:
            "Error when sending all the registers of participation regulations.",
        });
      } else {
        return res.json({
          code: 200,
          participacionUsers: result,
        });
      }
    });
  }

  //NO ESTA EN FUNCIONAMIENTO
  //funcion para traer elemento con los datos del usuario que lo registro
  async registeredParticipantUser(req, res) {
    const { id } = req.params;
    await _participationService.registeredParticipantUser(id).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message:
            "Error when sending all the registers of participation regulations.",
        });
      } else {
        return res.json({
          code: 200,
          totalParti: result,
        });
      }
    });
  }
}

module.exports = ParticipationController;
