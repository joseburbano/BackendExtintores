//slug para y shor id generar url
const fs = require("fs");
const path = require("path");

//funcion para recuperar nuestro backend para el avatar y envia la foto al frontend envia imagen a usuario
exports.getAvatar = (req, res) => {
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;
  
    fs.exists(filePath, (exists) => {
      if (!exists) {
        res.status(404).send({ message: "El avatar que buscas no existe." });
      } else {
        res.sendFile(path.resolve(filePath));
      }
    });
  };
  