import {
  GET_DATASETS_SUCCESS,
  GET_DATASETS_FAILURE,
  GET_DATASETS_LOADING
}
from 'constants/datasets';

const initialState = {
  list: [],
  waitingForFetch: false,
  errorOnFetch: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DATASETS_SUCCESS:
      return Object.assign({}, state, { list: action.payload.data, waitingForFetch: false, errorOnFetch: false });
    case GET_DATASETS_FAILURE:
      return Object.assign({}, state, { errorOnFetch: true, waitingForFetch: false });
    case GET_DATASETS_LOADING:
      return Object.assign({}, state, { waitingForFetch: true, errorOnFetch: false });
    default:
      return state;
  }
}
