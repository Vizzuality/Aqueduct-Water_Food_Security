import 'whatwg-fetch';
import {
  GET_DATASETS_SUCCESS,
  GET_DATASETS_FAILURE,
  GET_DATASETS_LOADING
}
from 'constants/datasets';
import { Deserializer } from 'jsonapi-serializer';

const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });

export function getDatasets() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_DATASETS_LOADING });
    fetch(new Request(`${config.apiUrl}/dataset?app=prep&includes=widget&page[size]=999`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      // Transforn JSON-API-like data
      deserializer.deserialize(data, (err, datasets) => {
        if (err) throw new Error('Error deserializing json api');
        // Fetch from server ok -> Dispatch datasets
        dispatch({
          type: GET_DATASETS_SUCCESS,
          payload: {
            data: datasets
          }
        });
      });
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_DATASETS_FAILURE,
        payload: err.message
      });
    });
  };
}
