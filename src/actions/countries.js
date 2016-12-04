import { GET_COUNTRIES_SUCCESS } from 'constants/countries';
import countries from 'data/countries.json';

export function getCountries() {
  const sortedCountries = countries.features.sort((a, b) => {
    return a.properties.name > b.properties.name ? 1 : -1;
  });
  return (dispatch) => {
    dispatch({
      type: GET_COUNTRIES_SUCCESS,
      payload: sortedCountries
    });
  };
}
