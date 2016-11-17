import { MAP_UPDATE_PAN } from 'constants/map';

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
    case MAP_UPDATE_PAN:
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
