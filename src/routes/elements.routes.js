const { Router } = require("express");
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware,
} = require("../middleware");
const multipart = require("connect-multiparty");
const md_upload_photo_elements = multipart({
  uploadDir: "./uploads/elementsImage",
});
const { CACHE_TIME } = require("../helpers");

module.exports = function ({ ElementsController }) {
  const router = Router();

  //ELEMENTOS EXTINTORES

  //agregar elementos nuevos
  router.post(
    "/add-element/:id",
    [AuthMiddleware],
    ElementsController.addElements,
  );

  //Eliminar Elementos
  router.delete(
    "/delete-element/:id",
    [AuthMiddleware],
    ElementsController.deleteElements,
  );

  //Actualizar elemento
  router.put(
    "/update-element/:id",
    [AuthMiddleware],
    ElementsController.updateElements,
  );

  //actualizar el elemento y subir foto dos mildeware uno de autenticacion y el de fichero
  router.put(
    "/upload-photo/:id",
    [AuthMiddleware, md_upload_photo_elements],
    ElementsController.uploadPhoto,
  );

  //aca otenemos la imagen para enviar al fron del elementos
  router.get("/get-photo/:fotoName", ElementsController.getPhoto);

  //En listar todo los elementos
  router.get(
    "/get-elements",
    [ParseIntMiddleware],
    ElementsController.getElements,
  );

  //En listar un solo elemento por url
  router.get("/get-element/:url", ElementsController.getElement);

  //En listar un solo elemento por id
  router.get("/get-elementId/:id", ElementsController.getElementId);

  //treser datos de sedes
  router.get(
    "/campus/:campus",
    [AuthMiddleware, ParseIntMiddleware],
    ElementsController.seeHeadquarters,
  );

  //treser datos de sede , bloque
  router.get(
    "/campus-block/:campus/:block",
    [AuthMiddleware, ParseIntMiddleware],
    ElementsController.queryBlock,
  );

  //treser datos de sede , bloque, piso
  router.get(
    "/campus-block-flat/:campus/:block/:flat",
    [AuthMiddleware, ParseIntMiddleware],
    ElementsController.consultFloor,
  );

  //informe de elementos
  router.get(
    "/report",
    [AuthMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)],
    ElementsController.exportItems,
  );

  //trae todos los elementos registrados por usuario
  router.get(
    "/element-register-user/:id",
    ElementsController.userRegisteredItem,
  );

  //trae el elemento mas los datos del usuario que lo registro
  router.get(
    "/register-user-elem/:id",
    ElementsController.userRegistrationElement,
  );

  return router;
};
