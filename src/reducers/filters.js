import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  crop: 'all',
  scope: 'global',
  country: null,
  year: 'baseline',
  food: '76f53ba4-b1d9-4385-8bab-f56aa707d961',
  water: '6c49ae6c-2c73-46ac-93ab-d4ed1b05d44e',
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
