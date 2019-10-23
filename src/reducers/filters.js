import { SET_FILTERS, RESET_FILTERS } from 'constants/filters';

const initialState = {
  page: '',
  crop: 'all',
  scope: 'global',
  country: undefined,
  countryName: undefined,
  period: 'year',
  period_value: 'baseline',
  year: 'baseline',
  food: 'none',
  indicator: 'none',
  irrigation: 'all',
  type: 'absolute',
  scenario: 'business_as_usual',
  iso: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS: {
      const newState = Object.assign({}, state, action.payload);
      return newState;
    }
    case RESET_FILTERS: {
      return initialState;
    }
    default:
      return state;
  }
}
