/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, Activity, conn } = require("../../src/db.js");

const agent = session(app);

describe("Country routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("GET COUNTRIES", () => {
    beforeEach(() => Country.sync({ force: true }));
    it("Deberia obtener get 200", () =>
      agent.get("/api/countries").expect(200));

    it("Deberia obtener get 404 si el name es invalido o el pais no existe", () =>
      agent.get("/api/countries?name=ashfajsl").expect(404));
  });
});

describe("Activity routes", () => {
  describe("POST COUNTRIES", () => {
    it("Deberia agregar correctamente una actividad", () =>
      agent
        .post("/")
        .send({
          name: "Futbol",
          difficulty: "2",
          duration: "1",
          season: "",
          codesCountries: ["COL", "ARG"],
        })
        .then(() => {
          return Activity.findOne({
            where: {
              name: "FUTBOL",
            }
          });
        }));
  });
});
