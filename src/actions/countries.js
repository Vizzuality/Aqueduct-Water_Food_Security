import {
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_LOADING,
  GET_COUNTRIES_ERROR
} from 'constants/countries';

import {
  SET_FILTERS
} from 'constants/filters'

import { store } from 'main';

export function getCountries() {
  return (dispatch) => {
    const query = `https://wri-01.carto.com/api/v2/sql?q=
    SELECT iso as id, name_engli as name, json(bbox) as geometry from gadm28_countries WHERE bbox IS NOT NULL ORDER BY name ASC`;
    // Start loading
    dispatch({
      type: GET_COUNTRIES_LOADING,
      payload: true
    });
    fetch(new Request(query))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch({
        type: GET_COUNTRIES_SUCCESS,
        payload: data.rows
      });
      // End loading
      dispatch({
        type: GET_COUNTRIES_LOADING,
        payload: false
      });

      // Sets country name
      const { filters } = store.getState();
      const { country } = filters;
      const countryName = ((data.rows || []).find(c => c.id === country) || {}).name;

      dispatch({
        type: SET_FILTERS,
        payload: { countryName }
      })
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_COUNTRIES_ERROR,
        payload: err.message
      });
      // End loading
      dispatch({
        type: GET_COUNTRIES_LOADING,
        payload: false
      });
    });
  };
}
