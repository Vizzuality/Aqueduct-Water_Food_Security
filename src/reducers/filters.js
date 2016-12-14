import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  crop: 'all',
  scope: 'global',
  country: null,
  scenario: 'optimistic',
  year: 'baseline',
  food: 'xxx',
  water: 'xxx',
  irrigation: ['irrigated', 'rainfed']
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
