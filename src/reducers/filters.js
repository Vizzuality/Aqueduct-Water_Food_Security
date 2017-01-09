import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  crop: 'all',
  scope: 'global',
  country: undefined,
  year: 'baseline',
  food: 'none',
  water: '6c49ae6c-2c73-46ac-93ab-d4ed1b05d44e',
  irrigation: ['irrigated']
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
