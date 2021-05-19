const request = require("supertest");
const app = require("../app");

describe("POST /refresh-access-token", () => {
  it("respond with error refresh token", (done) => {
    const data = {
      refreshToken:
        "dsfaksbvfhl64fh86t74u6834dj6uj4td6yuj46tj6846y4ju68gf7kj6f4hj6df46jfg64jyhk688l4fuhk468t76fr4g4fd6",
    };
    request(app)
      .post("/api/v1/refresh-access-token")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("respond with json refresh token", (done) => {
    const data = {
      refreshToken:
        "dsfaksbvfhl64fh86t74u6834dj6uj4td6yuj46tj6846y4ju68gf7kj6f4hj6df46jfg64jyhk688l4fuhk468t76fr4g4fd6",
    };
    request(app)
      .post("/api/v1/refresh-access-token")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());
  });
});
