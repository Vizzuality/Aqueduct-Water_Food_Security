import {
   COMPARE_SET_COUNTRY
}
from 'constants/compare';

export function setCompareCountry(country) {
  return dispatch => dispatch({ type: COMPARE_SET_COUNTRY, payload: country });
}
