import axios from "axios";

const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
const GET_COUNTRY = "GET_COUNTRY";
const CREATE_ACTIVITY = "CREATE_ACTIVITY";
const CLEAR_DETAIL = "CLEAR_DETAIL";
const GET_TYPE_ORDER = "GET_TYPE_ORDER";


const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const countries = await axios.get("http://localhost:3001/api/countries");
      dispatch({ type: GET_ALL_COUNTRIES, payload: countries.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const getCountriesSort = (name, sort, region, subregion, activity) => {
  return async (dispatch) => {
    try {
      let countries = await axios.get(`http://localhost:3001/api/countries`);

      if (name) {
        countries = await axios.get(
          `http://localhost:3001/api/countries?name=${name}`
        );
      }
      if (sort) {
        countries = await axios.get(
          `http://localhost:3001/api/countries?sort=${sort}`
        );
      }
      if (region) {
        countries.data = countries.data.filter(
          (country) => country.region === region
        );
      }
      if (subregion) {
        countries.data = countries.data.filter(
          (country) => country.subregion === subregion
        );
      }
      if (activity) {
        countries.data = countries.data.filter(
          (country) =>
            country.activities.filter((data) => data.name === activity).length
        );
      }
      dispatch({ type: GET_TYPE_ORDER, payload: countries.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const getCountryById = (id) => {
  if (id) {
    return async (dispatch) => {
      try {
        const country = await axios.get(
          `http://localhost:3001/api/countries/${id}`
        );
        dispatch({ type: GET_COUNTRY, payload: country.data });
      } catch (error) {
        console.log(error);
      }
    };
  }
  return { type: CLEAR_DETAIL };
};

const createActivity = (payload) => {
  return async (dispatch) => {
    try {
      const country = await axios.post(
        `http://localhost:3001/api/activity`,
        payload
      );
      dispatch({ type: CREATE_ACTIVITY, payload: country.data });
    } catch (error) {
      console.log(error);
    }
  };
};



export {
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  CLEAR_DETAIL,
  CREATE_ACTIVITY,
  GET_TYPE_ORDER,
  getAllCountries,
  getCountryById,
  createActivity,
  getCountriesSort,
};
