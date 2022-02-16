import {
  GET_ALL_COUNTRIES,
  GET_COUNTRY,
  CREATE_ACTIVITY,
  CLEAR_DETAIL,
  GET_TYPE_ORDER,
} from "../actions";

const initialState = {
  countries: [],
  countryDetail: {},
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_COUNTRIES:
      return { ...state, countries: payload };
    case GET_COUNTRY:
      return { ...state, countryDetail: payload };
    case GET_TYPE_ORDER:
      return { ...state, countries: payload };
    case CLEAR_DETAIL:
      return { ...state, countryDetail: {} };
    case CREATE_ACTIVITY:
      return {
        ...state,
        countries: [...state.countries, payload],
      };
    default:
      return state;
  }
};

export default rootReducer;
