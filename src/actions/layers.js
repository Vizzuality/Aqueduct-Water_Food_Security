import 'whatwg-fetch';
import {
  GET_LAYERS_SUCCESS,
  GET_LAYERS_ERROR,
  GET_LAYERS_LOADING
}
from 'constants/layers';
import { Deserializer } from 'jsonapi-serializer';

const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });

export function getLayers() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_LAYERS_LOADING });
    fetch(new Request(`${config.apiUrl}/layer?app=prep&page[size]=999`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((data) => {
      // Transforn JSON-API-like data
      deserializer.deserialize(data, (err, layers) => {
        if (err) throw new Error('Error deserializing json api');
        // Fetch from server ok -> Dispatch layers
        dispatch({
          type: GET_LAYERS_SUCCESS,
          payload: {
            data: layers
          }
        });
      });
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_LAYERS_ERROR,
        payload: err.message
      });
    });
  };
}
