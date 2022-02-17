const router = require("express").Router();
const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

router.get("/", async (req, res, next) => {
  const { name, sort } = req.query;
  try {
    if (sort || name) {
      const countryFilter = await filter(sort, name);

      return countryFilter.length === 0
        ? res.status(404).json({ message: "No related results" })
        : res.status(200).json(countryFilter);
    }

    const countryAll = await Country.findAll({
      include: { model: Activity, through: { attributes: [] } },
    });

    return countryAll ? res.status(200).json(countryAll) : res.sendStatus(404);
  } catch (error) {
    next(error);
  }
});

router.get("/:idPais", async (req, res, next) => {
  const { idPais } = req.params;
  const country = await Country.findByPk(idPais.toUpperCase(), {
    include: { model: Activity, through: { attributes: [] } },
  });

  return country
    ? res.status(200).json(country)
    : res
        .status(404)
        .json({ message: "The country you are looking for does not exist" });
});

async function filter(sort, name) {
  if (sort) {
    let columnSort, sortType;
    switch (sort) {
      case "AtoZ":
        columnSort = "name";
        sortType = "ASC";
        break;
      case "ZtoA":
        columnSort = "name";
        sortType = "DESC";
        break;
      case "pobAsc":
        columnSort = "population";
        sortType = "ASC";
        break;
      case "pobDes":
        columnSort = "population";
        sortType = "DESC";
        break;
      default:
        break;
    }

    return await Country.findAll({
      order: [[columnSort, sortType]],
      include: { model: Activity, through: { attributes: [] } },
    });
  }

  if (name) {
    return await Country.findAll({
      include: { model: Activity, through: { attributes: [] } },
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });
  }
}

/* router.post("/newCountry", async (req, res, next) => {
  const { name } = req.body;
  try {
    const country = await Country.create({
      name,
      cca3: "HHH",
      flags: "No Flags",
      region: "No Capital",
      capital: "No Capital",
      population: "1",
    });
    res.status(201).json(country);
  } catch (error) {
    next(error);
  }
}); */

module.exports = router;
