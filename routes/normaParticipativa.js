//librerias del servidor
const express = require("express");
//importamos mildeware  de autenticacion
const md_auth = require("../middleware/authenticated");
//mildeware para importar archivos que quiere que quiere cargar el usuario como fotos y archivos
const multipart = require("connect-multiparty");
const md_upload_foto_participacion = multipart({
  uploadDir: "./uploads/NormativaImagen",
});

const api = express.Router();

const participacionControllers = require("../Controllers/participacionControllers");

//NORMA DE PARTICIPACION

//rutas para los participantes
api.post(
  "/add-participacion/:id",
  [md_auth.ensureAuth],
  participacionControllers.addParticipacion
);
//Agrega participacion
api.delete(
  "/delete-participacion/:id",
  [md_auth.ensureAuth],
  participacionControllers.deleteParticipacion
);
//Eliminar participacion

api.put(
  "/update-participacion/:id",
  [md_auth.ensureAuth],
  participacionControllers.updateParticipacion
);
//Actualizar participacion

//actualizar un usuario el avatar dos mildeware uno de autenticacion y el de fichero
api.put(
  "/upload-foto-participacion/:id",
  [md_auth.ensureAuth, md_upload_foto_participacion],
  participacionControllers.uploadParticipacion
);
//aca otenemos la imagen para enviar al fron del avatar de quien publico
api.get(
  "/get-foto-participar-avatar/:fotoName",
  participacionControllers.getFotoParticipacionAvatar
);

//aca otenemos la imagen para enviar al fron del particiopador
api.get(
  "/get-foto-participar/:fotoName",
  participacionControllers.getFotoParticipacion
);

//aca otenemos la imagen para enviar al fron del particiopador
api.get(
  "/get-foto-partici/:fotoName",
  participacionControllers.getFotoParticipacion
);

api.get("/get-participacion", participacionControllers.getParticipantes);
//En listar todo los participacion

api.get("/get-participacion/:url", participacionControllers.getParticipante);
//En listar un solo participacion

//informe de participacion
api.get(
  "/informe-participacion",
  [md_auth.ensureAuth],
  participacionControllers.exportarParticipacion
);

module.exports = api;
