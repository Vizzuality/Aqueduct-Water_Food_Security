import {
  TOOLTIP_TOGGLE,
  TOOLTIP_SET_CHILDREN,
  TOOLTIP_LOADING,
  TOOLTIP_SET_CHILDREN_PROPS,
  TOOLTIP_SET_POSITION,
  TOOLTIP_FOLLOW_TOGGLE
}
from 'constants/ui';

const initialState = {
  opened: false,
  children: null,
  loading: false,
  follow: false,
  childrenProps: {},
  position: {
    x: 0,
    y: 0
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOOLTIP_TOGGLE:
      return Object.assign({}, state, { opened: action.payload });
    case TOOLTIP_SET_CHILDREN:
      return Object.assign({}, state, { children: action.payload });
    case TOOLTIP_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case TOOLTIP_SET_CHILDREN_PROPS:
      return Object.assign({}, state, { childrenProps: action.payload });
    case TOOLTIP_SET_POSITION:
      return Object.assign({}, state, { position: { x: action.payload.x, y: action.payload.y } });
    case TOOLTIP_FOLLOW_TOGGLE:
      return Object.assign({}, state, { follow: action.payload });
    default:
      return state;
  }
}
