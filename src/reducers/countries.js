import {
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_LOADING,
  GET_COUNTRIES_ERROR
} from 'constants/countries';

const initialState = {
  list: [],
  error: null,
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES_SUCCESS:
      return Object.assign({}, state, { list: action.payload });
    case GET_COUNTRIES_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case GET_COUNTRIES_ERROR:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
}
