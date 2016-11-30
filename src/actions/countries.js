import { GET_COUNTRIES_SUCCESS } from 'constants/countries';
import countries from 'data/countries.json';

export function getCountries() {
  return (dispatch) => {
    dispatch({
      type: GET_COUNTRIES_SUCCESS,
      payload: countries.features
    });
  };
}
