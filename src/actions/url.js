import { push } from 'react-router-redux';

export function updateMapUrl() {
  return (dispatch, state) => {
    const { map, filters } = state();
    const { year, country, crop, food, irrigation, scope, water } = filters;
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.latLng.lat.toFixed(2),
        lng: map.latLng.lng.toFixed(2),
        zoom: map.zoom,
        year,
        country: country || undefined,
        crop,
        food,
        irrigation: (irrigation) ? irrigation.join(',') : undefined,
        scope,
        water
      }
    };
    dispatch(push(locationDescriptor));
  };
}

export function updateCompareUrl() {
  return (dispatch, state) => {
    const { compare, filters } = state();
    const { year, crop, food, irrigation, water } = filters;
    const locationDescriptor = {
      pathname: '/compare',
      query: {
        countries: compare.countries.join(','),
        year,
        crop,
        food,
        irrigation: irrigation.join(','),
        scope: 'country',
        water
      }
    };
    dispatch(push(locationDescriptor));
  };
}
