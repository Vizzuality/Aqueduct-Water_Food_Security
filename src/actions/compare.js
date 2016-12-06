import {
   COMPARE_SET_COUNTRY,
   COMPARE_SET_FILTER
}
from 'constants/compare';

export function setCompareCountry(country) {
  return dispatch => dispatch({ type: COMPARE_SET_COUNTRY, payload: country });
}

export function setFilters(filter) {
  return dispatch => dispatch({ type: COMPARE_SET_FILTER, payload: filter });
}
