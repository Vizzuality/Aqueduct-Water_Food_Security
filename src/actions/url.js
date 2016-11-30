import { push } from 'react-router-redux';

export function updateMapUrl() {
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

export function updateCompareUrl() {
  return (dispatch, state) => {
    const { compare } = state();
    const locationDescriptor = {
      pathname: '/compare',
      query: {
        countries: compare.countries.join(',')
      }
    };
    dispatch(push(locationDescriptor));
  };
}
