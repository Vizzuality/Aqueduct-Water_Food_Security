import WRISerializer from 'wri-json-api-serializer';
import 'whatwg-fetch';
import {
  GET_DATASETS_SUCCESS,
  GET_DATASETS_ERROR,
  GET_DATASETS_LOADING
} from 'constants/datasets';

export function getDatasets() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_DATASETS_LOADING });
    // TODO: remove the date now
    /**
     * TODO: REVERT THIS BEFORE MERGING!
     * We're using an unpublished dataset to get down the road, so we need to
     * use a laxer query for now, but we will want to switch back when the
     * correct dataset is published
     */
    // fetch(new Request(`${config.API_URL}/dataset?application=aqueduct&status=saved&published=true&includes=widget,layer,vocabulary,metadata&page[size]=9999`))
    fetch(new Request(`${config.API_URL}/dataset?application=aqueduct&includes=widget,layer,vocabulary,metadata&page[size]=9999`))
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

export default getDatasets;
