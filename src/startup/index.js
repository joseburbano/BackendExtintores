const express = require("express");

let _express = null;
let _config = null;

class Server {
  constructor({ config, router }) {
    _config = config;
    _express = express().use(router);
  }

  start() {
    return new Promise((resolve) => {
      _express.listen(_config.PORT, () => {
        console.log("#####");
        console.log(_config.APPLICATION_NAME);
        console.log("#####");
        console.log("#####");
        console.log(
          `http://${_config.IP_SERVER}:${_config.PORT}/${_config.API_API}/${_config.API_VERSION}/`,
        );
        console.log("Server Running");

        resolve();
      });
    });
  }
}

module.exports = Server;
