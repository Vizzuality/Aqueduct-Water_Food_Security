import {
  SET_FILTERS
} from 'constants/filters';

const initialState = {
  scope: 'global',            // {global|country}
  country: null,
  prediction: 'optimistic',     // {optimistic|pesimistic|business}
  baseline: 'current',
  food: 'production',         // {production|demand|trade}
  water: 'water-risk',        // {water-risk|ground}
  irrigation: ['irrigated']   // {irrigated|rainfed}, one value at least
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
