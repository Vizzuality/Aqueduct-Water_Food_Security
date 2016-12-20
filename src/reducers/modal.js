import {
  MODAL_TOGGLE,
  MODAL_SET_OPTIONS,
  MODAL_LOADING
}
from 'constants/ui';

const initialState = {
  opened: false,
  options: {
    children: null,
    childrenProps: null,
    size: ''
  },
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MODAL_TOGGLE:
      return Object.assign({}, state, { opened: action.payload });
    case MODAL_SET_OPTIONS:
      return Object.assign({}, state, { options: action.payload });
    case MODAL_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    default:
      return state;
  }
}
