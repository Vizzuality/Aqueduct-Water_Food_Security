import {
   COMPARE_SET_COUNTRY,
   COMPARE_EMPTY_COUNTRIES
}
from 'constants/compare';

const initialState = {
  countries: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMPARE_SET_COUNTRY: {
      const countries = state.countries.slice(0);
      countries[action.payload.index] = action.payload.iso;
      return Object.assign({}, state, { countries });
    }
    case COMPARE_EMPTY_COUNTRIES:
      return Object.assign({}, state, { countries: [] });
    default:
      return state;
  }
}
