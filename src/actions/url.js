import { push } from 'react-router-redux';

export function setMapUrl() {
  return (dispatch, state) => {
    const params = state().map;
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: params.latLng.lat.toFixed(2),
        lng: params.latLng.lng.toFixed(2),
        zoom: params.zoom
      }
    };
    dispatch(push(locationDescriptor));
  };
}
