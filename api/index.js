//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const axios = require("axios");
const { Country } = require("./src/db");

const countriesAdd = async () => {
  const countries = await axios.get(`https://restcountries.com/v3/all`);

  await Promise.all(
    countries.data.map((country) => {
      let data = {
        name: country.name.common,
        cca3: country.cca3,
        flags: country.flags[0],
        capital: country.capital ? country.capital[0] : "No Capital",
        region: country.region ? country.region : "No Region",
        subregion: country.subregion ? country.subregion : "No Sub-Region",
        area: parseFloat(country.area) ? parseFloat(country.area) : 0,
        population: parseInt(country.population),
      };

      Country.findOrCreate({ where: data });
    })
  );
};

countriesAdd();
console.log('Registros Agregados...')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
