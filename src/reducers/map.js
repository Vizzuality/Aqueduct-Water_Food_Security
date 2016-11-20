import { SET_MAP_PARAMS } from 'constants/map';

// TODO: complete map initial state
const initialState = {
  zoom: 3,
  latLng: {
    lat: 0,
    lng: 0
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP_PARAMS:
      return Object.assign({}, state, {
        zoom: action.payload.zoom,
        latLng: {
          lat: action.payload.latLng.lat,
          lng: action.payload.latLng.lng
        }
      });
    default:
      return state;
  }
}
