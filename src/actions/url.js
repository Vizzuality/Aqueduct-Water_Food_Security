import { push } from 'react-router-redux';

export function updateMapUrl() {
  return (dispatch, state) => {
    const { map, filters } = state();
    const { year, country, crop, food, irrigation, scenario, scope, water } = filters;
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.latLng.lat.toFixed(2),
        lng: map.latLng.lng.toFixed(2),
        zoom: map.zoom,
        year,
        country,
        crop,
        food,
        irrigation: irrigation.join(','),
        scenario,
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
    const { year, country, crop, food, irrigation, scenario, scope, water } = filters;
    const locationDescriptor = {
      pathname: '/compare',
      query: {
        countries: compare.countries.join(','),
        year,
        country,
        crop,
        food,
        irrigation: irrigation.join(','),
        scenario,
        scope,
        water
      }
    };
    dispatch(push(locationDescriptor));
  };
}
