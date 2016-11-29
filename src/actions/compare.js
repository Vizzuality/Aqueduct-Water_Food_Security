import {
  COMPARE_SET_COUNTRIES
}
from 'constants/compare';

export function setCompareCountries(countries) {
  return dispatch => dispatch({ type: COMPARE_SET_COUNTRIES, payload: countries });
}
