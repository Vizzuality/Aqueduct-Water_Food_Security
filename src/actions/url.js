import { push } from 'react-router-redux';

export function updateUrl() {
  return (dispatch, state) => {
    const { map, filters } = state();
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.latLng.lat.toFixed(2),
        lng: map.latLng.lng.toFixed(2),
        zoom: map.zoom,
        filters: btoa(JSON.stringify(filters))
      }
    };
    dispatch(push(locationDescriptor));
  };
}
