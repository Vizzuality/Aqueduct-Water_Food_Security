import {
   COMPARE_SET_COUNTRY,
   COMPARE_SET_DATASETS
}
from 'constants/compare';

const initialState = {
  countries: [],
  datasets: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMPARE_SET_COUNTRY: {
      const countries = state.countries.slice(0);
      countries[action.payload.index] = action.payload.iso;
      return Object.assign({}, state, { countries });
    }
    case COMPARE_SET_DATASETS: {
      const datasets = state.datasets.slice(0);
      datasets[action.payload.index] = action.payload.datasets;
      return Object.assign({}, state, { datasets });
    }
    default:
      return state;
  }
}
