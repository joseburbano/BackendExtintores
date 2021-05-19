const request = require("supertest");
const app = require("../app");
const assert = require("assert");

/**
 * participation search test report
 */
describe("POST /add-participacion/:id", () => {
  it("reply with json The Element already exists..", (done) => {
    const data = {
      claseRiesgoLocativo: "Distribución de espacios",
      condicionInsegura: "Escaleras sin pasamanos",
      lugar: "tye",
      descripcionNovedad: "tur",
      motivoRazon: "tu",
      medidasImplementar: "trurey",
      primerosAuxilios: "no",
      relacionTrabajo: "si",
    };
    request(app)
      .post("/api/v1/add-participacion/5fa3beaa65143b3394a28c9c")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500)
      .expect(
        {
          code: 500,
          message: "El Elemento ya existe.",
        },
        done()
      );
  });
});

it("Respond with json Failed to create Element.", (done) => {
  const data = {
    claseRiesgoLocativo: "Distribución de espacios",
    condicionInsegura: "Escaleras sin pasamanos",
    lugar: "tye",
    descripcionNovedad: "tur",
    motivoRazon: "tu",
    medidasImplementar: "trurey",
    primerosAuxilios: "no",
    relacionTrabajo: "si",
  };
  request(app)
    .post("/api/v1/add-participacion/5fa3beaa65143b3394a28c9c")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404, done());
});

it("respond with json Item already registered with a user", (done) => {
  const data = {
    claseRiesgoLocativo: "Distribución de espacios",
    condicionInsegura: "Escaleras sin pasamanos",
    lugar: "tye",
    descripcionNovedad: "tur",
    motivoRazon: "tu",
    medidasImplementar: "trurey",
    primerosAuxilios: "no",
    relacionTrabajo: "si",
  };
  request(app)
    .post("/api/v1/add-participacion/5fa3beaa65143b3394a28c9c")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(500)
    .expect(
      {
        code: 500,
        message: "El Registro ya esta registrado con un usuario",
      },
      done()
    );
});

it("Respond with json Failed to create element and user.", (done) => {
  const data = {
    claseRiesgoLocativo: "Distribución de espacios",
    condicionInsegura: "Escaleras sin pasamanos",
    lugar: "tye",
    descripcionNovedad: "tur",
    motivoRazon: "tu",
    medidasImplementar: "trurey",
    primerosAuxilios: "no",
    relacionTrabajo: "si",
  };
  request(app)
    .post("/api/v1/add-participacion/5fa3beaa65143b3394a28c9c")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404)
    .expect(
      {
        code: 404,
        message: "Error al crear elemento y usuario.",
      },
      done()
    );
});

it("Respond with json Item Created Successfully.", (done) => {
  const data = {
    claseRiesgoLocativo: "Distribución de espacios",
    condicionInsegura: "Escaleras sin pasamanos",
    lugar: "tye",
    descripcionNovedad: "tur",
    motivoRazon: "tu",
    medidasImplementar: "trurey",
    primerosAuxilios: "no",
    relacionTrabajo: "si",
  };
  request(app)
    .post("/api/v1/add-participacion/5fa3beaa65143b3394a28c9c")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404)
    .expect(
      {
        code: 200,
        message: "Elemento creado Correctamente.",
      },
      done()
    );
});

it("respond with json the Error add", (done) => {
  const data = {
    claseRiesgoLocativo: "Distribución de espacios",
    condicionInsegura: "Escaleras sin pasamanos",
    lugar: "tye",
    descripcionNovedad: "tur",
    motivoRazon: "tu",
    medidasImplementar: "trurey",
    primerosAuxilios: "no",
    relacionTrabajo: "si",
  };
  request(app)
    .post("/api/v1/add-participacion/5fa3beaa65143b3394a28c9c")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404)
    .expect(
      {
        code: 500,
        message: "Error agregar",
      },
      done()
    );
});

/**
 * participation delete test report
 */

describe("DELETE /delete-participacion/:id", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .delete("/api/v1/delete-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("reply with json No participation data found.!", (done) => {
    request(app)
      .delete("/api/v1/delete-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done());
  });

  it("respond with json  No participation data found.!", (done) => {
    request(app)
      .delete("/api/v1/delete-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json server error!", (done) => {
    request(app)
      .delete("/api/v1/delete-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json Participation regulations data not found", (done) => {
    return request(app)
      .delete("/api/v1/delete-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done());
  });

  it("responds with json It has been successfully removed.", (done) => {
    return request(app)
      .delete("/api/v1/delete-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());
  });
});

/**
 * participation put  testing
 */

describe("PUT /update-participacion/:id", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .put("/api/v1/update-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("reply with json No participation data has been found.!", (done) => {
    request(app)
      .put("/api/v1/update-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done());
  });

  it("responds with json Data in participation regulations correctly updated.!", (done) => {
    request(app)
      .put("/api/v1/update-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });
});

/**
 * participation put photo testing
 */

describe("PUT /upload-foto-participacion/:id", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .put("/api/v1/upload-foto-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("reply with json No participation data has been found.!", (done) => {
    request(app)
      .put("/api/v1/upload-foto-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done());
  });

  it("responds with json The image extension is not valid. (Allowed extensions: .png and .jpg)!", (done) => {
    request(app)
      .put("/api/v1/upload-foto-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json server error!", (done) => {
    request(app)
      .put("/api/v1/upload-foto-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json No photo has been found of the participation regulations form.!", (done) => {
    request(app)
      .put("/api/v1/upload-foto-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json exito!", (done) => {
    request(app)
      .put("/api/v1/upload-foto-participacion/5fa3beaa65143b3394a28c9c")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });
});

/**
 * participation get photo testing
 */

describe("GET /get-foto-participar/:fotoName", () => {
  it("responds with The avatar you are looking for does not exist.", (done) => {
    request(app)
      .get("/api/v1/get-foto-participar/img.png")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });
});

/**
 * participation get testing
 */

describe("GET /get-participacion", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/get-participacion")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("reply with json No participant found.!", (done) => {
    request(app)
      .get("/api/v1/get-participacion")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done());
  });

  it("responds with json exist!", (done) => {
    return request(app)
      .get("/api/v1/get-participacion")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());
  });
});

/**
 * participation search testing url
 */

describe("GET /get-participacion/:url", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/get-participacion/emergencia-wdaqJKHzY")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json No data of a participation has been found.!", (done) => {
    request(app)
      .get("/api/v1/get-participacion/emergencia-wdaqJKHzY")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json exist!", (done) => {
    return request(app)
      .get("/api/v1/get-participacion/emergencia-wdaqJKHzY")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());
  });
});

/**
 * participation search testing url
 */

describe("GET /informe-participacion", () => {
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/informe-participacion")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json No participation record has been found.!", (done) => {
    request(app)
      .get("/api/v1/informe-participacion")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done());
  });

  it("responds with json exist!", (done) => {
    return request(app)
      .get("/api/v1/informe-participacion")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done());
  });
});
