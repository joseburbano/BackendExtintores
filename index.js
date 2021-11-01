const container = require("./src/startup/container");
const server = container.resolve("app");
//extraemos variables
const { DB_MONGO_URL } = container.resolve("config");

//inicializamos mongo
const mongoose = require("mongoose");

mongoose.connect(
  DB_MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, res) => {
    if (err) {
      console.log("Database connection error.");
      throw err;
    } else {
      console.log("The connection to the database is correct.");
      server.start();
    }
  },
);
