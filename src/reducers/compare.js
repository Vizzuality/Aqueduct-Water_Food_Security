import {
   COMPARE_SET_COUNTRY
}
from 'constants/compare';

const initialState = {
  countries: [],
  datasets: [],
  layers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMPARE_SET_COUNTRY: {
      const countries = state.countries.slice(0);
      countries[action.payload.index] = action.payload.iso;
      return Object.assign({}, state, { countries });
    }
    default:
      return state;
  }
}
