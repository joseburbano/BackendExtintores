const request = require("supertest");
const app = require("../app");
const assert = require("assert");

/**
 * Testing post all users registration without blocking
 */

describe("POST /sing-up", () => {
  it('respond with json "Passwords are required" when the password and repietPassword exist', (done) => {
    const data = {
      fullname: "jose manuel",
      cedula: "10752878279",
      tipo: "student",
      cargo: "student",
      tel: "87247854",
      email: "student@corhuila.edu.co",
      password: "",
      repeatPassword: "",
      rol: "student",
    };
    request(app)
      .post("/api/v1/sing-up")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect(
        {
          code: 404,
          message: "Las contraseñas son obligatorias",
        },
        done
      );
  });

  it("respond with json the passwords are not the same", (done) => {
    const data = {
      fullname: "jose manuel",
      cedula: "10752878279",
      tipo: "student",
      cargo: "student",
      tel: "87247854",
      email: "student@corhuila.edu.co",
      password: "corhuila123",
      repeatPassword: "corhuila123456",
      rol: "student",
    };
    request(app)
      .post("/api/v1/sing-up")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect(
        {
          code: 404,
          message: "Las contraseñas no son iguales",
        },
        done
      );
  });

  it("respond with json How to prevent the registration from being repeated", (done) => {
    const data = {
      fullname: "jose manuel",
      cedula: "9013213801",
      tipo: "student",
      cargo: "student",
      tel: "87247854",
      email: "jose_jmbp@live.com",
      password: "corhuila123",
      repeatPassword: "corhuila123",
      rol: "Administrador",
    };
    request(app)
      .post("/api/v1/sing-up")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .expect(
        {
          code: 500,
          message: "El usuario ya existe.",
        },
        done()
      );
  });

  it("respond with json error creating user", (done) => {
    const data = {
      fullname: "jose manuel",
      cedula: "91576",
      tipo: "student",
      cargo: "student",
      tel: "87247854",
      email: "jose_jmbp@live.com",
      password: "corhuila123",
      repeatPassword: "corhuila123",
      rol: "Administrador",
    };
    request(app)
      .post("/api/v1/sing-up")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .expect(
        {
          code: 404,
          message: "Error al crear Usuario.",
        },
        done()
      );
  });

  it("respond with json user created successfully", (done) => {
    const data = {
      fullname: "jose manuel",
      cedula: "91576",
      tipo: "student",
      cargo: "student",
      tel: "87247854",
      email: "jose_jmbp@liveeeee.com",
      password: "corhuila123",
      repeatPassword: "corhuila123",
      rol: "Administrador",
    };
    request(app)
      .post("/api/v1/sing-up")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        code: 200,
        message: "Usuario Creado Correctamente.",
      })
      .end((err) => {
        if (err) return done(err);
      });
    done();
  });
});

/**
 * user search testing
 */

describe("GET /user/:id", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/user/5f8e0bab897fc92dbc5cb")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .then((response) => {
        assert(response.body.code, "500");
        assert(response.body.message, "Error del Servidor.");
        done();
      })
      .catch((err) => done(err));
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .get("/api/v1/user/5fab79821698911470f94cca")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404)
      .then((response) => {
        assert(response.body.code, "s404");
        assert(response.body.message, "Usuario no encontrado.");
        done();
      })
      .catch((err) => done(err));
  });

  it("responds with json exist user!", (done) => {
    return request(app)
      .get("/api/v1/user/5f8e0bab897fc92dbb102ccb")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(254, done());

    //   .then((response) => {
    //     assert(response.body.code, "200");
    //     assert(response.body.user);
    //     done();
    //   })
    //   .catch((err) => done(err));
  });
});

// describe("POST /sign-in", () => {
//   it('respond with json exist user login correct!', async (done) => {
//     agent(app)
//       .post("/api/v1/sign-in")
//       .send({ email: "jose_jmbp@live.com", password: "19950323" })
//       .set("Accept", "application/json")
//       .expect("Content-Type", /json/)
//       .expect(200, done())
//     //   .end((err, res) => {
//     //     if (err) {
//     //       return done(err);
//     //     }
//     //     console.log(res);
//     //     expect(res.code);
//     //     expect(res.user);
//     //     expect(res.rol);
//     //     expect(res.accessToken);
//     //     expect(res.refreshToken);
//     //     return done();
//     //   });
//   });
// });
