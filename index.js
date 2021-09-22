const mongoose = require("mongoose");
const app = require("./bin/app");
const port = process.env.PORT || 4000;
const { API_VERSION, DB_URL, IP_SERVER } = require("./config/defaul");

mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
  },
  (err, res) => {
    if (err) {
      console.log("Error en la conexion en la base de datos");
      throw err;
    } else {
      console.log("La conexión a la base de datos es correcta.");

      app.listen(port, () => {
        console.log("#####");
        console.log("API REST EXTINTORES");
        console.log("#####");
        console.log("#####");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
        console.log("Servidor Funcionando");
      });
    }
  },
);
