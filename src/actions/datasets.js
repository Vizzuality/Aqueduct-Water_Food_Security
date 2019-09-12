import WRISerializer from 'wri-json-api-serializer';
import 'whatwg-fetch';
import {
  GET_DATASETS_SUCCESS,
  GET_DATASETS_ERROR,
  GET_DATASETS_LOADING
}
from 'constants/datasets';

export function getDatasets() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_DATASETS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/dataset?application=aqueduct&status=saved&published=true&includes=widget,layer,vocabulary,metadata&page[size]=${Date.now()}`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch({
        type: GET_DATASETS_SUCCESS,
        payload: WRISerializer(data)
      });
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_DATASETS_ERROR,
        payload: err.message
      });
    });
  };
}
