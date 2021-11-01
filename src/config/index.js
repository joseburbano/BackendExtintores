if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  PORT: process.env.PORT,
  DB_MONGO_URL: process.env.DB_MONGO_URL,
  APPLICATION_NAME: process.env.APPLICATION_NAME,
  API_VERSION: process.env.API_VERSION,
  IP_SERVER: process.env.IP_SERVER,
  API_API: process.env.API_API,
  JWT_SECRET: process.env.JWT_SECRET,
  CACHE_KEY: process.env.CACHE_KEY,
  SWAGGER_PATH: `../config/swagger/${process.env.SWAGGER_DOC}.json`,
};
