import {
  MODAL_TOGGLE,
  MODAL_SET_CHILDREN,
  MODAL_LOADING,
  MODAL_SET_CHILDREN_PROPS
}
from 'constants/ui';

const initialState = {
  opened: false,
  children: null,
  loading: false,
  childrenProps: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MODAL_TOGGLE:
      return Object.assign({}, state, { opened: action.payload });
    case MODAL_SET_CHILDREN:
      return Object.assign({}, state, { children: action.payload });
    case MODAL_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case MODAL_SET_CHILDREN_PROPS:
      return Object.assign({}, state, { childrenProps: action.payload });
    default:
      return state;
  }
}
