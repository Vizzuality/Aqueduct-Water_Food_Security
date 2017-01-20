import { GET_COUNTRIES_SUCCESS } from 'constants/countries';

export function getCountries() {
  return (dispatch) => {
    const query = `https://wri-01.carto.com/api/v2/sql?q=
    SELECT iso as id, name_engli as name, json(bbox) as geometry from gadm28_countries WHERE bbox IS NOT NULL ORDER BY name ASC`;

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
    });
  };
}
