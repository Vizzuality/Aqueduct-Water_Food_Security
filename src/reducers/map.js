import { MAP_UPDATE_PAN } from 'constants/map';

// TODO: complete map initial state
const initialState = {
  zoom: 1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MAP_UPDATE_PAN:
      return Object.assign({}, state, { zoom: action.payload.zoom });
    default:
      return state;
  }
}
