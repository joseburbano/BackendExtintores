const request = require("supertest");
const app = require("../app");

describe("GET /datos-inicio/:fecha  responds with json startup data for the panel!", () => {
  it("responds with json Error del server.!", (done) => {
    request(app)
      .get("/api/v1/datos-inicio/:")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json user no found!", (done) => {
    request(app)
      .get("/api/v1/datos-inicio/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done());
  });

  it("responds with json extintor no found!", (done) => {
    request(app)
      .get("/api/v1/datos-inicio/:fecha")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json normativa no found!!", (done) => {
    request(app)
      .get("/api/v1/datos-inicio/:fecha")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json covid no found!!", (done) => {
    request(app)
      .get("/api/v1/datos-inicio/:fecha")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json full!", (done) => {
    request(app)
      .get("/api/v1/datos-inicio/:fecha")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done())
  });

});
