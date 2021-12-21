import { SET_ANALYSIS, RESET_ANALYSIS } from 'constants/analyzer';

const initialState = {
  locations: undefined,
  mapView: 'all',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ANALYSIS: {
      const newState = Object.assign({}, state, action.payload);
      return newState;
    }
    case RESET_ANALYSIS: {
      return { ...initialState, scope: state.scope };
    }
    default:
      return state;
  }
}
