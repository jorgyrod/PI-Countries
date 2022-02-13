import rootReducer from "../redux/reducer";
import { GET_ALL_COUNTRIES } from "../redux/actions";

let countries = [
  {
    name: "French Southern and Antarctic Lands",
    cca3: "ATF",
    flags: "https://flagcdn.com/tf.svg",
    region: "Antarctic",
    subregion: "No Sub-Region",
    capital: "Port-aux-Français",
    population: 400,
    area: 7747,
    activities: [],
  },
  {
    name: "Colombia",
    cca3: "COL",
    flags: "https://flagcdn.com/co.svg",
    region: "Americas",
    subregion: "South America",
    capital: "Bogotá",
    population: 50882884,
    area: 1141748,
    activities: [],
  },
];

describe("Reducer", () => {
  const state = {
    countries: [],
    countryDetail: {},
  };

  it("Deberia retornar el estado inicial si no se pasa un type valido", () => {
    expect(rootReducer(undefined, [])).toEqual({
      countries: [],
      countryDetail: {},
    });
  });

  it("Deberia guardar en nuestro state los countries cuando el type es 'GET_ALL_COUNTRIES", () => {
    const result = rootReducer(state, {
      type: GET_ALL_COUNTRIES,
      payload: countries,
    });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      countries: countries,
      countryDetail: {},
    });
  });
});
