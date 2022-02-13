const router = require("express").Router();
const { Activity } = require("../db");

router.post("/", async (req, res, next) => {
  const { name, difficulty, duration, season, codesCountries } = req.body;
  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season: season.charAt(0).toUpperCase() + season.slice(1).toLowerCase(),
    });

    for (const countryID of codesCountries) {
      await newActivity.addCountry(countryID);
    }
    res.status(201).json(newActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;