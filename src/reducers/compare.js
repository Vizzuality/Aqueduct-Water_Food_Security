import {
  COMPARE_SET_COUNTRIES
}
from 'constants/compare';

const initialState = {
  countries: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMPARE_SET_COUNTRIES:
      return Object.assign({}, state, { countries: action.payload });
    default:
      return state;
  }
}
