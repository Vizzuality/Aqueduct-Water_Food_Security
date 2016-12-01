import {
   COMPARE_SET_COUNTRY,
   COMPARE_SET_DATASETS
}
from 'constants/compare';

export function setCompareCountry(country) {
  return dispatch => dispatch({ type: COMPARE_SET_COUNTRY, payload: country });
}
