import { GET_COUNTRIES_SUCCESS } from 'constants/countries';

const initialState = {
  list: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return Object.assign({}, state, { list: action.payload });
    default:
      return state;
  }
}
