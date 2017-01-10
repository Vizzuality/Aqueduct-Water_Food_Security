import {
  GET_SHARE_SUCCESS,
  GET_SHARE_ERROR,
  GET_SHARE_LOADING
}
from 'constants/share';

const initialState = {
  url: '',
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHARE_SUCCESS:
      return Object.assign({}, state, { url: action.payload, loading: false, error: false });
    case GET_SHARE_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    case GET_SHARE_LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    default:
      return state;
  }
}
