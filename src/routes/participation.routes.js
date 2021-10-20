const { Router } = require("express");
const {
  AuthMiddleware,
  ParseIntMiddleware,
  CacheMiddleware,
} = require("../middleware");
const multipart = require("connect-multiparty");
const md_upload_foto_participacion = multipart({
  uploadDir: "./uploads/normativeImage",
});
const { CACHE_TIME } = require("../helpers");

module.exports = function ({ ParticipationController }) {
  const router = Router();

  //RUTAS DE NORMA DE PARTICIPACION

  //Agregar registro de normativa de partcipación
  router.post(
    "/add-participation/:userId",
    [AuthMiddleware],
    ParticipationController.addParticipation,
  );

  //Eliminar registro de normativa de participación
  router.delete(
    "/delete-participation/:partiId",
    [AuthMiddleware],
    ParticipationController.deleteParticipation,
  );

  //Actualizar registro de normativa de participación
  router.put(
    "/update-participation/:id",
    [AuthMiddleware],
    ParticipationController.updateParticipation,
  );

  //actualizar foto de normativa de participación
  router.put(
    "/upload-photo-participation/:id",
    [AuthMiddleware, md_upload_foto_participacion],
    ParticipationController.uploadParticipation,
  );

  //aca otenemos la imagen para enviar al fron del avatar de quien publico en normativa de partcipación
  router.get(
    "/get-photo-participation-avatar/:fotoName",
    ParticipationController.getPhotoParticipationAvatar,
  );

  //aca otenemos la imagen para enviar al fron del particiopador normativa de partcipación
  router.get(
    "/get-photo-share/:fotoName",
    ParticipationController.getPhotoShare,
  );

  //En listar todo los participacion
  router.get(
    "/get-participation",
    [ParseIntMiddleware],
    ParticipationController.getParticipation,
  );

  //En listar un solo dato  de normativa de partcipación
  router.get("/get-participation/:url", ParticipationController.getCompetitor);

  //informe de participacion
  router.get(
    "/report-participation",
    [AuthMiddleware, CacheMiddleware(CACHE_TIME.ONE_HOUR)],
    ParticipationController.exportShare,
  );

  return router;
};
