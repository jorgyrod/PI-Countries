const { Activity } = require("../../src/db.js");
const { expect } = require("chai");

describe("Modelo Activity", () => {
  describe("Validaciones", () => {
    beforeEach(() => Activity.sync({ force: true }));
    it("Deberia dar error si name es null", (done) => {
      Activity.create({})
        .then(() => done(new Error("Requiere un name valido")))
        .catch(() => done());
    });
    it("Deberia crear correctamente con un name valido", () => {
      Activity.create({ name: "Futbol" });
    });
    it("Deberia dar error si difficulty es mayor a 5", (done) => {
      Activity.create({
        name: "Futbol",
        difficulty: "6",
      })
        .then(() => done(new Error("Requiere difficulty un valor valido")))
        .catch(() => done());
    });
    it("Deberia crear correctamente una actividad con datos completos", ()=>{
        Activity.create({
            name: 'Futbol',
            difficulty: '4',
            duration: '1',
            season: ''
        });
    })
  });
});
