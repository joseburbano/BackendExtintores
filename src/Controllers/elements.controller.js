let _elementsService = null;

class ElementsController {
  constructor({ ElementsService }) {
    _elementsService = ElementsService;
  }

  //agregar elemento en este caso extintores
  async addElements(req, res) {
    const data = req.body;
    const { id } = req.params;
    console.log(id);
    await _elementsService.addElements(data, id).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "Failed to add new item." });
      } else {
        return res.json({
          code: 200,
          iduser: resul._id,
          message: "Item Created Successfully.",
        });
      }
    });
  }

  //traer permisos
  async deleteElements(req, res) {
    const { id } = req.params;
    await _elementsService.deleteElements(id).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Error trying to delete the registered item.",
        });
      } else {
        return res.json({
          code: 200,
          message: "Item removed successfully.",
        });
      }
    });
  }

  //actualizar un elemento
  async updateElements(req, res) {
    const elementsData = req.body;
    const { id } = req.params;
    await _elementsService.updateElements(elementsData, id).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "Error No item record was found to update.",
        });
      } else {
        return res.json({
          code: 200,
          message: "Item updated successfully.",
        });
      }
    });
  }

  //Actualizar elemento y subir foto
  async uploadPhoto(req, res) {
    const { id } = req.params;
    const data = req.files;
    await _elementsService.uploadPhoto(id, data).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "No item was found." });
      } else {
        return res.json({
          code: 200,
          permisos: resul,
        });
      }
    });
  }

  //Enviar foto al frontend
  async getPhoto(req, res) {
    const fotoName = req.params.fotoName;
    const filePath = "./uploads/elementsImage/" + fotoName;
    await _elementsService.getPhoto(filePath).then((resul) => {
      if (!resul) {
        return res.json({
          code: 401,
          message: "The photo you are looking for does not exist.",
        });
      } else {
        return res.sendFile(resul);
      }
    });
  }

  //Enviar todos los elementos
  async getElements(req, res) {
    const { pageSize, pageNum } = req.query;
    await _elementsService.getElements(pageSize, pageNum).then((element) => {
      if (!element) {
        return res.json({ code: 401, message: "No item was found." });
      } else {
        const result = element[1] / pageSize;
        return res.json({
          code: 200,
          extintores: element[0],
          total: {
            totalPage: Math.round(result),
            pageNum: element[3],
            pageSize: element[2],
          },
        });
      }
    });
  }

  //Enviar un solo elemento por url
  async getElement(req, res) {
    const { url } = req.params;
    await _elementsService.getElement(url).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "No item was found." });
      } else {
        return res.json({
          code: 200,
          extintor: resul,
          foto: resul.foto,
        });
      }
    });
  }

  //Enviar un solo elemento por id
  async getElementId(req, res) {
    const { id } = req.params;
    await _elementsService.getElementId(id).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "No item was found." });
      } else {
        return res.json({
          code: 200,
          extintor: resul,
          foto: resul.foto,
        });
      }
    });
  }

  //traer por sede
  async seeHeadquarters(req, res) {
    const { campus } = req.params;
    const { pageSize, pageNum } = req.query;
    await _elementsService
      .seeHeadquarters(campus, pageSize, pageNum)
      .then((element) => {
        if (!element) {
          return res.json({
            code: 401,
            message: "No item was found at that site.",
          });
        } else {
          const result = element[1] / pageSize;
          return res.json({
            code: 200,
            extintores: element[0],
            total: {
              totalPage: Math.round(result),
              pageNum: element[3],
              pageSize: element[2],
            },
          });
        }
      });
  }

  //traer por bloque
  async queryBlock(req, res) {
    const { campus, block } = req.params;
    const { pageSize, pageNum } = req.query;
    await _elementsService
      .queryBlock(campus, block, pageSize, pageNum)
      .then((element) => {
        if (!element) {
          return res.json({
            code: 401,
            message: "No item was found in that block.",
          });
        } else {
          const result = element[1] / pageSize;
          return res.json({
            code: 200,
            extintores: element[0],
            total: {
              totalPage: Math.round(result),
              pageNum: element[3],
              pageSize: element[2],
            },
          });
        }
      });
  }

  //traer por piso
  async consultFloor(req, res) {
    const { campus, block, flat } = req.params;
    const { pageSize, pageNum } = req.query;
    await _elementsService
      .consultFloor(campus, block, flat, pageSize, pageNum)
      .then((element) => {
        if (!element) {
          return res.json({
            code: 401,
            message: "No items were found on that floor.",
          });
        } else {
          const result = element[1] / pageSize;
          return res.json({
            code: 200,
            extintores: element[0],
            total: {
              totalPage: Math.round(result),
              pageNum: element[3],
              pageSize: element[2],
            },
          });
        }
      });
  }

  //Enviar datos de elementos informe
  async exportItems(req, res) {
    await _elementsService.exportItems().then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "No item was found." });
      } else {
        return res.json({
          code: 200,
          totalExtint: resul,
        });
      }
    });
  }

  //funcion para traer todos los elemento registrados por el usuario un usuario
  async userRegisteredItem(req, res) {
    const { id } = req.params;
    await _elementsService.userRegisteredItem(id).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "No item was found." });
      } else {
        return res.json({
          code: 200,
          elemUsers: resul,
        });
      }
    });
  }

  //funcion para traer todos los elemento registrados con los datos del usuario
  async userRegistrationElement(req, res) {
    const { id } = req.params;
    await _elementsService.userRegistrationElement(id).then((resul) => {
      if (!resul) {
        return res.json({ code: 401, message: "No item was found." });
      } else {
        return res.json({
          code: 200,
          elemUsers: resul,
        });
      }
    });
  }
}
module.exports = ElementsController;
