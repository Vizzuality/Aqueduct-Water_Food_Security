import {
  MODAL_OPEN,
  MODAL_CLOSE,
  MODAL_SET_CHILDREN,
  MODAL_LOADING,
  MODAL_READY,
  MODAL_SET_CHILDREN_PROPS
}
from 'constants/ui';

const initialState = {
  closed: true,
  children: null,
  loading: false,
  childrenProps: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MODAL_OPEN:
      return Object.assign({}, state, { closed: false });
    case MODAL_CLOSE:
      return Object.assign({}, state, { closed: true });
    case MODAL_SET_CHILDREN:
      return Object.assign({}, state, { children: action.payload });
    case MODAL_LOADING:
      return Object.assign({}, state, { loading: true });
    case MODAL_READY:
      return Object.assign({}, state, { loading: false });
    case MODAL_SET_CHILDREN_PROPS:
      return Object.assign({}, state, { childrenProps: action.payload });
    default:
      return state;
  }
}
