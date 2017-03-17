import {
  SET_EMBED,
  GET_WIDGET_SUCCESS,
  GET_WIDGET_ERROR
}
from 'constants/embed';

const initialState = {
  id: null,
  data: null,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_EMBED:
      return Object.assign({}, state, { id: action.payload.id });

    case GET_WIDGET_SUCCESS:
      return Object.assign({}, state, { data: action.payload });

    case GET_WIDGET_ERROR:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
}
