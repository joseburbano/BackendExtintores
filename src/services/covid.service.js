const BaseService = require("./base.service");
const slug = require("slug");
const shortid = require("shortid");
const fs = require("fs");
const path = require("path");

let _covidRepository = null;

class CovidService extends BaseService {
  constructor({ CovidRepository }) {
    super(CovidRepository);
    _covidRepository = CovidRepository;
  }

  async addCovid(data, id) {
    if (data) {
      const error = new Error();
      error.status = 404;
      error.message = "The data could not be received correctly.";
      throw error;
    }

    Url = data.diagnosticoCovid;
    const url = slug(Url).toLowerCase();
    data.url = `${url}-${shortid.generate()}`;
    active = data.active;
    active = true;
    data.active = active;
    estado = data.estado;
    estado = true;
    data.estado = estado;

    const currentEntityUser = await _covidRepository.getCovidUser(id);

    if (!currentEntityUser) {
      const error = new Error();
      error.status = 404;
      error.message = "User does not exist.";
      throw error;
    }

    data.user = currentEntityUser;
    const currentUserRegisCovid = await _covidRepository.create(data);

    if (!currentUserRegisCovid) {
      const error = new Error();
      error.status = 401;
      error.message = "Error inserting user data to covid record.";
      throw error;
    }

    currentEntityUser.covids.push(currentUserRegisCovid._id);

    if (!currentEntityUser.covids) {
      const error = new Error();
      error.status = 401;
      error.message = "Failed to insert covid data to user record.";
      throw error;
    }

    return await _covidRepository.covidUserUpdate(
      currentEntityUser._id,
      currentEntityUser,
    );
  }

  //eliminar un registro de covid
  async deleteCovid(id) {
    if (id) {
      const error = new Error();
      error.status = 404;
      error.message = "Error extracting the record id";
      throw error;
    }

    const currentCovid = await _covidRepository.get(id);

    if (currentCovid) {
      const error = new Error();
      error.status = 401;
      error.message = "Covid registry does not exist.";
      throw error;
    }

    const currentUpdateUser = await _covidRepository.covidUserUpdateDelete(
      id,
      currentCovid,
    );

    if (currentUpdateUser) {
      const error = new Error();
      error.status = 401;
      error.message = "Error trying to update user and delete the record.";
      throw error;
    }

    return await _covidRepository.delete(id);
  }

  //eliminar un registro de covid
  async getCovi(url) {
    if (url) {
      const error = new Error();
      error.status = 404;
      error.message = "Error extracting the record url";
      throw error;
    }

    return await _covidRepository.getCovi(url);
  }

  //aqui en listamos para exportar a excel
  async exportExcelCovid() {
    return await _covidRepository.exportExcelCovid();
  }

  //Enviar un foto al regitro covid
  async getAvatar(fotoName) {
    const filePath = "./uploads/avatar/" + fotoName;

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

  //enviar todos los registro de covid
  async getCovids(pageSize, pageNum) {
    return await _covidRepository.getAllCovid(pageSize, pageNum);
  }

  //Actualizar un registro de covid
  async updateCovid(id, coviData) {
    if (!id || !coviData) {
      const error = new Error();
      error.status = 404;
      error.message =
        "Error extracting id and data to update the requested covid record.";
      throw error;
    }

    return await _covidRepository.update(id, coviData);
  }
}

module.exports = CovidService;
