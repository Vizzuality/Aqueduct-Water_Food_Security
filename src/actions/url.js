import { replace } from 'react-router-redux';

export function updateMapUrl() {
  return (dispatch, state) => {
    const { map, filters } = state();
    const { period, period_value, year, country, crop, food, irrigation, scope, indicator, type } = filters;
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.latLng.lat.toFixed(2),
        lng: map.latLng.lng.toFixed(2),
        zoom: map.zoom,
        period,
        period_value,
        year,
        country,
        crop,
        food,
        irrigation: (irrigation) ? irrigation.join(',') : undefined,
        scope,
        indicator,
        type
      }
    };
    dispatch(replace(locationDescriptor));
  };
}

export function updateCompareUrl() {
  return (dispatch, state) => {
    const { compare, filters } = state();
    const { period, period_value, year, crop, food, irrigation, indicator, type } = filters;
    const locationDescriptor = {
      pathname: '/compare',
      query: {
        countries: compare.countries.join(','),
        period,
        period_value,
        year,
        crop,
        food,
        irrigation: irrigation.join(','),
        scope: 'country',
        indicator,
        type
      }
    };
    dispatch(replace(locationDescriptor));
  };
}
