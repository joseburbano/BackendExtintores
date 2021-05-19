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
        done()
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
        done()
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
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .get("/api/v1/user/5fab79821698911470f94cca")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist user!", (done) => {
    return request(app)
      .get("/api/v1/user/5f8e0bab897fc92dbb102ccb")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});

describe("POST /sign-in", () => {

  const data = {
    email: "jose_jmbp@live.com",
    password: "corhuila123",
  };

  
  it("responds with json server error!", (done) => {
    request(app)
      .post("/api/v1/sign-in")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .post("/api/v1/sign-in")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist user!", (done) => {
    return request(app)
      .post("/api/v1/sign-in")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});





describe("GET /get-users-active", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/get-users-active")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .get("/api/v1/get-users-active")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist user!", (done) => {
    return request(app)
      .get("/api/v1/get-users-active")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});



describe("PUT /upload-avatar/:id", () => {

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

  
  it("responds with json server error!", (done) => {
    request(app)
      .put("/api/v1/upload-avatar/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .put("/api/v1/upload-avatar/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist user!", (done) => {
    return request(app)
      .put("/api/v1/upload-avatar/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});

describe("PUT /update-user/:id", () => {

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

  
  it("responds with json server error!", (done) => {
    request(app)
      .put("/api/v1/update-user/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .put("/api/v1/update-user/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist user!", (done) => {
    return request(app)
      .put("/api/v1/update-user/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});




describe("PUT /activate-user/:id", () => {

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

  
  it("responds with json server error!", (done) => {
    request(app)
      .put("/api/v1/activate-user/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .put("/api/v1/activate-user/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with  user active!", (done) => {
    return request(app)
      .put("/api/v1/activate-user/:id")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});






describe("DELETE /delete-user/:id", () => {
  
  it("responds with json server error!", (done) => {
    request(app)
      .delete("/api/v1/delete-user/:id")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .delete("/api/v1/delete-user/:id")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with  user active!", (done) => {
    return request(app)
      .delete("/api/v1/delete-user/:id")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});





describe("POST /sign-up-admin", () => {

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

  
  it("responds with json server error!", (done) => {
    request(app)
      .post("/api/v1/sign-up-admin")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json get user not found!", (done) => {
    request(app)
      .post("/api/v1/sign-up-admin")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist user!", (done) => {
    return request(app)
      .post("/api/v1/sign-up-admin")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());

  });
});

