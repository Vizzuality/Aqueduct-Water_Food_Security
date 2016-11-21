import { SET_FILTERS, SET_CURRENT_FILTER } from 'actions/filters';

const initialState = {
  current: 'global',
  global: {},
  country: {},
  subcatchment: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FILTERS:
      return Object.assign({}, state, {
        [state.current]: action.payload
      });

    case SET_CURRENT_FILTER:
      return Object.assign({}, state, {
        current: action.payload
      });


    default:
      return state;
  }
}
