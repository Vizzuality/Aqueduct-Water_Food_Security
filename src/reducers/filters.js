import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  crop: 'all',
  scope: 'global',
  country: undefined,
  period: 'year',
  period_value: 'baseline',
  year: 'baseline',
  food: 'none',
  indicator: 'none',
  irrigation: ['irrigated'],
  type: 'absolute'
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS: {
      return Object.assign({}, state, action.payload);
    }
    default:
      return state;
  }
}
