import {
  GET_DATASETS_SUCCESS,
  GET_DATASETS_ERROR,
  GET_DATASETS_LOADING
}
from 'constants/datasets';

const initialState = {
  list: [],
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATASETS_SUCCESS:
      return Object.assign({}, state, { list: action.payload.data, loading: false, error: false });
    case GET_DATASETS_ERROR:
      return Object.assign({}, state, { error: true, loading: false });
    case GET_DATASETS_LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    default:
      return state;
  }
}
