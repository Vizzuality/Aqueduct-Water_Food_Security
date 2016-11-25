import { push } from 'react-router-redux';

export function setMapUrl() {
  return (dispatch, state) => {
    const params = state().map;
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: params.latLng.lat,
        lng: params.latLng.lng,
        zoom: params.zoom
      }
    };
    dispatch(push(locationDescriptor));
  };
}
