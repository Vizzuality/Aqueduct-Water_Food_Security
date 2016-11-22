import { SET_MAP_LOCATION } from 'actions/map';

// TODO: complete map initial state
const initialState = {
  zoom: 2,
  latLng: {
    lat: 52,
    lng: 7
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return Object.assign({}, state, {
        zoom: action.payload.zoom !== undefined ? action.payload.zoom : state.zoom,
        latLng: {
          lat: action.payload.latLng.lat !== undefined ? action.payload.latLng.lat : state.latLng.lat,
          lng: action.payload.latLng.lng !== undefined ? action.payload.latLng.lng : state.latLng.lng
        }
      });
    default:
      return state;
  }
}
