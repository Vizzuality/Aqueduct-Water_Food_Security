import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  crop: 'all',
  scope: 'global',
  country: undefined,
  year: 'baseline',
  food: 'none',
  water: 'none',
  irrigation: ['irrigated'],
  changeFromBaseline: false
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
