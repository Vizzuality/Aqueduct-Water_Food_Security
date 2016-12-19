import { SET_SIDEBAR_WIDTH } from 'actions/sidebar';

// TODO: complete map initial state
const initialState = {
  width: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SIDEBAR_WIDTH:
      return Object.assign({}, state, {
        width: action.payload
      });
    default:
      return state;
  }
}
