import {
  GET_LAYERS_SUCCESS,
  GET_LAYERS_ERROR,
  GET_LAYERS_LOADING
}
from 'constants/layers';

const initialState = {
  list: [],
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LAYERS_SUCCESS:
      return Object.assign({}, state, { list: action.payload.data, loading: false, error: false });
    case GET_LAYERS_ERROR:
      return Object.assign({}, state, { error: true, loading: false });
    case GET_LAYERS_LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    default:
      return state;
  }
}
