import {
   COMPARE_SET_COUNTRY,
   COMPARE_SET_FILTER,
   COMPARE_EMPTY_COUNTRIES
}
from 'constants/compare';

export function setCompareCountry(country) {
  return dispatch => dispatch({ type: COMPARE_SET_COUNTRY, payload: country });
}

export function setCompareFilters(filter) {
  return dispatch => dispatch({ type: COMPARE_SET_FILTER, payload: filter });
}

export function emptyCompareCountries() {
  return dispatch => dispatch({ type: COMPARE_EMPTY_COUNTRIES });
}
