const request = require("supertest");
const app = require("../app");
const assert = require("assert");


describe("POST /add-covid/:id", () => {
    it('reply with json Covid record already exists.', (done) => {
      const data = {
        sede: "Sede Prado Alto",
        diagnosticoCovid: "si",
        diasCovid: "12",
        sospecha: "si",
        fiebreDias: "si",
        respiratoriosDias: "si",
        sospechosoContagiado: "si",
        sospechosoFamiliar: "si",
        temperatura: "30",
        sintomas:"[]"

      };
      request(app)
        .post("/api/v1/add-covid/5fc540f94f812054bcbd5cda")
        .send(data)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(500, done())
    });
});

it("Respond with json the Error creating covid form.", (done) => {
  const data = {
    sede: "Sede Prado Alto",
    diagnosticoCovid: "si",
    diasCovid: "hsdgs",  //puse letras donde debe ir numero
    sospecha: "si",
    fiebreDias: "si",
    respiratoriosDias: "si",
    sospechosoContagiado: "si",
    sospechosoFamiliar: "si",
    temperatura: "30",
    sintomas:"[]"
  };
  request(app)
    .post("/api/v1/add-covid/5fc540f94f812054bcbd5cda")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404, done())
});

it("respond with json the Registry is already registered with a user", (done) => {
  const data = {
    sede: "Sede Prado Alto",
    diagnosticoCovid: "si",
    diasCovid: "12",
    sospecha: "si",
    fiebreDias: "si",
    respiratoriosDias: "si",
    sospechosoContagiado: "si",
    sospechosoFamiliar: "si",
    temperatura: "30",
    sintomas:"[]"
  };
  request(app)
    .post("/api/v1/add-covid/5fc540f94f812054bcbd5cda")
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

it("Respond with json the Error creating the record on the user.", (done) => {
  const data = {
    sede: "Sede Prado Alto",
    diagnosticoCovid: "si",
    diasCovid: "hsdgs",  //puse letras donde debe ir numero
    sospecha: "si",
    fiebreDias: "si",
    respiratoriosDias: "si",
    sospechosoContagiado: "si",
    sospechosoFamiliar: "si",
    temperatura: "30",
    sintomas:"[]"
  };
  request(app)
    .post("/api/v1/add-covid/5fc540f94f812054bcbd5cda")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404)
    .expect(
      {
        code: 500,
        message: "Error al crear el registro en el usuario.",
      },
      done()
    );
});

it("Respond with json the Registry created Successfully.", (done) => {
  const data = {
    sede: "Sede Prado Alto",
    diagnosticoCovid: "no",
    diasCovid: "12",
    sospecha: "si",
    fiebreDias: "si",
    respiratoriosDias: "no",
    sospechosoContagiado: "si",
    sospechosoFamiliar: "si",
    temperatura: "20",
    sintomas:"[]"
  };
  request(app)
    .post("/api/v1/add-covid/5fc540f94f812054bcbd5cda")
    .send(data)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(404)
    .expect(
      {
        code: 200,
        message: "Registro creado Correctamente.",
      },
      done()
    );
});

it("respond with json the Error add", (done) => {
  const data = {
    sede: "Sede Prado Alto",
    diagnosticoCovid: "si",
    diasCovid: "12",
    sospecha: "si",
    fiebreDias: "si",
    respiratoriosDias: "si",
    sospechosoContagiado: "si",
    sospechosoFamiliar: "si",
    temperatura: "30",
    sintomas:"[]"
  };
  request(app)
    .post("/api/v1/add-covid/5fc540f94f812054bcbd5cda")
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
 * covid delete  testing
 */

 describe("DELETE /delete-covid/:id", () => {
  
  it("responds with json server error!", (done) => {
    request(app)
      .delete("/api/v1/delete-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("reply with json No covid record found!", (done) => {
    request(app)
      .delete("/api/v1/delete-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json server error!", (done) => {
    request(app)
      .delete("/api/v1/delete-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("respond with json covid form data not found!", (done) => {
    request(app)
      .delete("/api/v1/delete-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json respond with json It has been removed successfully.", (done) => {
    return request(app)
      .delete("/api/v1/delete-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done())
  });
});


/**
 * covid put  testing
 */

 describe("PUT /update-covid/:id", () => {
  
  it("responds with json server error!", (done) => {
    request(app)
      .put("/api/v1/update-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("reply with json No Covid log data found.!", (done) => {
    request(app)
      .put("/api/v1/update-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json Covid form data correctly updated.!", (done) => {
    request(app)
      .put("/api/v1/update-covid/5fa2b9b928370e350431771a")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });
});

/**
 * covid search testing all covid
 */
 describe("GET /get-covids", () => {
  
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/get-covids")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("reply with json No Covid log data found.!", (done) => {
    request(app)
      .get("/api/v1/get-covids")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist!", (done) => {
    return request(app)
      .get("/api/v1/get-covids")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done())
  });
});


/**
 * covid search testing avatar
 */

 describe("GET /get-avatar-covids", () => {
  
  it("responds with json The avatar you are looking for does not exist.r!", (done) => {
    request(app)
      .get("/api/v1/get-avatar-covids")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

});

/**
 * covid search testing url covid
 */

 describe("GET /get-covid/:url", () => {
  
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/get-covid/si-OU2n6UVxy")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json No covid form found.!", (done) => {
    request(app)
      .get("/api/v1/get-covid/si-OU2n6UVxy")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("responds with json exist!", (done) => {
    return request(app)
      .get("/api/v1/get-covid/si-OU2n6UVxy")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done())
  });

});

/**
 * covid search testing report
 */

 describe("GET /informe-covid", () => {
  
  it("responds with json server error!", (done) => {
    request(app)
      .get("/api/v1/informe-covid")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(500, done())
  });

  it("reply with json No Covid log data found.!", (done) => {
    request(app)
      .get("/api/v1/informe-covi")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done())
  });

  it("responds with json exist!", (done) => {
    return request(app)
      .get("/api/v1/informe-covi")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done())
  });
});