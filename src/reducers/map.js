import { SET_MAP_LOCATION } from 'actions/map';

// TODO: complete map initial state
const initialState = {
  latLng: {
    lat: 30,
    lng: -15
  },
  zoom: 3
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MAP_LOCATION:
      return Object.assign({}, state, {
        zoom: isNaN(action.payload.zoom) ? state.zoom : action.payload.zoom,
        latLng: {
          lat: isNaN(action.payload.latLng.lat) ? state.latLng.lat : action.payload.latLng.lat,
          lng: isNaN(action.payload.latLng.lng) ? state.latLng.lng : action.payload.latLng.lng
        }
      });
    default:
      return state;
  }
}
