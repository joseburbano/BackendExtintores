const BaseService = require("./base.service");
//slug para y shor id generar url
const slug = require("slug");
const shortid = require("shortid");
//avatar
const fs = require("fs");
const path = require("path");

let _elementsRepository = null;

class ElementsService extends BaseService {
  constructor({ ElementsRepository }) {
    super(ElementsRepository);
    _elementsRepository = ElementsRepository;
  }

  async addElements(data, id) {
    Url = data.placa;
    const url = slug(Url).toLowerCase();
    data.url = `${url}-${shortid.generate()}`;
    active = data.active;
    active = true;
    data.active = active;

    const currentEntity = await _elementsRepository.getIdUser(id);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message =
        "Error, I cannot identify the user, please restart the section.";
      throw error;
    }

    data.user = currentEntity;

    if (!data.user) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "Error trying to store user data to item record.";
      throw error;
    }

    const dataSave = _elementsRepository.create(data);

    if (!dataSave) {
      const error = new Error();
      error.code = 401;
      error.status = 401;
      error.message = "Failed to save item record.";
      throw error;
    }

    currentEntity.elementos.push(dataSave._id);

    return await _elementsRepository.update(id, currentEntity);
  }

  //Eliminar Registro de Elemento
  async deleteElements(id) {
    const currentEntity = await _elementsRepository.get(id);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Failed to find the registered item.";
      throw error;
    }

    const updateUser = await _elementsRepository.updateUserelementsId(
      currentEntity._id,
      id,
    );

    if (updateUser) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message =
        "An error occurred when trying to update the user who made this registration.";
      throw error;
    }

    return await _elementsRepository.delete(id);
  }

  //Actualizar Registro de Elemento
  async updateElements(elementsData, id) {
    if (!elementsData || !id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "You need the data to update and the identifier.";
      throw error;
    }
    return await _elementsRepository.update(id, elementsData);
  }

  //Actualizar dato de vatar del elemento
  async uploadPhoto(id, data) {
    if (!id || !data) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "the identifier and files to update are important.";
      throw error;
    }

    const currentEntity = await _elementsRepository.get(id);

    if (currentEntity) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Failed to find item record on update.";
      throw error;
    }

    let filePath = data.avatar.path;
    let fileSplit = filePath.split("/");
    let fileNames = fileSplit[2];
    let extSplit = fileNames.split(".");
    var fileExt = extSplit[1];

    if (fileExt !== "png" && fileExt !== "jpg" && fileExt !== "jpeg") {
      const error = new Error();
      error.code = 400;
      error.status = 400;
      error.message =
        "The image extension is not valid. (Allowed extensions: .png and .jpg";
      throw error;
    }

    currentEntity.foto = fileNames;

    return await _elementsRepository.update(id, currentEntity);
  }

  //Enviar foto al frontend
  async getPhoto(filePath) {
    const photo = fs.exists(filePath, (exists) => {
      if (!exists) {
        const error = new Error();
        error.code = 404;
        error.status = 404;
        error.message = "The photo you are looking for does not exist.";
        throw error;
      }
      return filePath;
    });
    return await path.resolve(photo);
  }

  //enviar todos los elementos
  async getElements(pageSize, pageNum) {
    return await _elementsRepository.getAll(pageSize, pageNum);
  }

  //enviar un solo elemento
  async getElement(url) {
    if (!url) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Url is required error.";
      throw error;
    }
    return await _elementsRepository.getUrl(url);
  }

  //enviar un solo elemento
  async getElementId(id) {
    if (!id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Url is required error.";
      throw error;
    }
    return await _elementsRepository.get(id);
  }

  //traer por sede
  async seeHeadquarters(campus, pageSize, pageNum) {
    if (!campus) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Campus is required error.";
      throw error;
    }
    return await _elementsRepository.getAllElementsCampus(
      campus,
      pageSize,
      pageNum,
    );
  }

  //traer por bloque
  async queryBlock(campus, block, pageSize, pageNum) {
    if (!campus || !block) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Campus and block is required error.";
      throw error;
    }
    return await _elementsRepository.getElementsQueryBlock(
      campus,
      block,
      pageSize,
      pageNum,
    );
  }

  //traer por piso
  async consultFloor(campus, block, flat, pageSize, pageNum) {
    if (!campus || !block || !flat) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Campus, block and flat is required error.";
      throw error;
    }
    return await _elementsRepository.getElementsQueryBlockFlat(
      campus,
      block,
      flat,
      pageSize,
      pageNum,
    );
  }

  //Enviar datos de elementos informe
  async exportItems() {
    return await _elementsRepository.exportShareElements();
  }

  //funcion para traer todos los elemento registrados por el usuario un usuario
  async userRegisteredItem(id) {
    if (!id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Id is required error.";
      throw error;
    }
    return await _elementsRepository.userRegisteredItem(id);
  }

  //funcion para traer todos los elemento registrados por el usuario un usuario
  async userRegistrationElement(id) {
    if (!id) {
      const error = new Error();
      error.code = 404;
      error.status = 404;
      error.message = "Id is required error.";
      throw error;
    }
    return await _elementsRepository.userRegistrationElement(id);
  }
}

module.exports = ElementsService;
