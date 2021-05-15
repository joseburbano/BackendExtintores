//librerias del servidor
const express = require("express");
//importamos mildeware  de autenticacion
const md_auth = require("../middleware/authenticated");
//mildeware para importar archivos que quiere que quiere cargar el usuario como fotos y archivos
const multipart = require("connect-multiparty");
const md_upload_foto_extintores = multipart({
  uploadDir: "./uploads/extintores",
});

const elementoControllers = require("../Controllers/elementoControllers");

const api = express.Router();

 //EXTINTOREES

  //rutas para los extintores
  api.post(
    "/add-extintor/:id",
    [md_auth.ensureAuth],
    elementoControllers.addExtintor
  );
  //Agrega Extintor
  api.delete("/delete-extintor/:id", elementoControllers.deleteExtintor);
  //Eliminar Extintor

  api.put(
    "/update-extintor/:id",
    [md_auth.ensureAuth],
    elementoControllers.updateExtintor
  );
  //Actualizar Extintor

  //actualizar un usuario el avatar dos mildeware uno de autenticacion y el de fichero
  api.put(
    "/upload-foto/:id",
    [md_auth.ensureAuth, md_upload_foto_extintores],
    elementoControllers.uploadFoto
  );
  //aca otenemos la imagen para enviar al fron del extintor
  api.get("/get-foto/:fotoName", elementoControllers.getFoto);

  api.get("/get-extintores", elementoControllers.getExtintores);
  //En listar todo los extintor

  api.get("/get-extintor/:url", elementoControllers.getExtintor);
  //En listar un solo extintor por url

  api.get("/get-extintorid/:id", elementoControllers.getExtintorId);
  //En listar un solo extintor por id

  //treser datos de sedes
  api.get(
    "/sede/:sede",
    [md_auth.ensureAuth],
    elementoControllers.consulSede
  );

  //treser datos de sede , bloque
  api.get(
    "/sede-bloque/:sede/:bloque",
    [md_auth.ensureAuth],
    elementoControllers.consulBloque
  );
  //treser datos de sede , bloque, piso
  api.get(
    "/sede-bloquepiso/:sede/:bloque/:piso",
    [md_auth.ensureAuth],
    elementoControllers.consulPiso
  );
  //informe de extintores
  api.get(
    "/informe",
    [md_auth.ensureAuth],
    elementoControllers.exportarExtintores
  );

  //trae todos los elementos registrados por usuario
  api.get(
    "/element-register-user/:_id",
    elementoControllers.elementsRegistradoUser
  );

  //trae el elemento mas los datos del usuario que lo registro
  api.get("/register-user-elem/:_id", elementoControllers.RegistradoUser);


  module.exports = api;