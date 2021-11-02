import { replace } from 'react-router-redux';

export function updateMapUrl() {
  return (dispatch, state) => {
    const { map, filters } = state();
    const { period, period_value, year, country, crop, food, irrigation, scope, indicator, type, threshold, subscope } = filters;
    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.center.lat.toFixed(2),
        lng: map.center.lng.toFixed(2),
        basemap: map.basemap,
        zoom: map.zoom,
        period,
        period_value,
        year,
        country,
        crop,
        food,
        irrigation,
        scope,
        subscope,
        indicator,
        threshold,
        type,
        opacity: map.parametrization.opacity
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
        irrigation,
        scope: 'country',
        indicator,
        type
      }
    };
    dispatch(replace(locationDescriptor));
  };
}

export function updateReportUrl() {
  return (dispatch, state) => {
    const { map, filters } = state();
    const { period, period_value, year, country, crop, food, irrigation, scope, indicator, type } = filters;
    const locationDescriptor = {
      pathname: '/report',
      query: {
        lat: map.center.lat.toFixed(2),
        lng: map.center.lng.toFixed(2),
        zoom: map.zoom,
        period,
        period_value,
        year,
        country,
        crop,
        food,
        irrigation,
        scope,
        indicator,
        type
      }
    };
    dispatch(replace(locationDescriptor));
  };
}
