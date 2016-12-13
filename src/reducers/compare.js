import {
   COMPARE_SET_COUNTRY,
   COMPARE_SET_FILTER
}
from 'constants/compare';

const initialState = {
  countries: [],
  datasets: [],
  layers: [],
  filters: {
    crop: 'all',
    scope: 'global',            // {global|country}
    scenario: 'ssp2 rcp45',     // {optimistic|pesimistic|business}
    year: 'bs',
    food: 'production',         // {production|demand|trade}
    water: 'water-risk',        // {water-risk|ground}
    irrigation: ['irrigated', 'rainfed'],   // {irrigated|rainfed}, one value at least
    query: {
      water: '',
      food: ''
    }
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMPARE_SET_COUNTRY: {
      const countries = state.countries.slice(0);
      countries[action.payload.index] = action.payload.iso;
      return Object.assign({}, state, { countries });
    }
    case COMPARE_SET_FILTER: {
      const newFilters = Object.assign({}, state.filters, action.payload);
      return Object.assign({}, state, { filters: newFilters });
    }
    default:
      return state;
  }
}
