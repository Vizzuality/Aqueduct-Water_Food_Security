import { replace } from 'react-router-redux';

export function updateMapUrl() {
  return (dispatch, state) => {
    const { map, filters } = state();
    const { period_type, period_value, year, country, crop, food, irrigation, scope, water, data_type } = filters;
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.latLng.lat.toFixed(2),
        lng: map.latLng.lng.toFixed(2),
        zoom: map.zoom,
        period_type,
        period_value,
        year,
        country,
        crop,
        food,
        irrigation: (irrigation) ? irrigation.join(',') : undefined,
        scope,
        water,
        data_type
      }
    };
    dispatch(replace(locationDescriptor));
  };
}

export function updateCompareUrl() {
  return (dispatch, state) => {
    const { compare, filters } = state();
    const { period_type, period_value, year, crop, food, irrigation, water, data_type } = filters;
    const locationDescriptor = {
      pathname: '/compare',
      query: {
        countries: compare.countries.join(','),
        period_type,
        period_value,
        year,
        crop,
        food,
        irrigation: irrigation.join(','),
        scope: 'country',
        water,
        data_type
      }
    };
    dispatch(replace(locationDescriptor));
  };
}
