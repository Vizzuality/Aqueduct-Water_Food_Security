import jsonExample from 'data/widget-list-example';

/**
 * GET POSTS
*/
export const GET_WIDGETS_SUCCESS = 'GET_WIDGETS_SUCCESS';
export const GET_WIDGETS_FAILURE = 'GET_WIDGETS_FAILURE';
export const GET_WIDGETS_LOADING = 'GET_WIDGETS_LOADING';

/**
 * EXECUTE ACTION
*/
export function executeAction(type, payload) {
  return { type, payload };
}


/**
 * ACTIONS
*/
export function getWidgets() {
  return (dispatch) => {
    dispatch(executeAction(GET_WIDGETS_LOADING, true));
    // We should change this to an API call
    return setTimeout(() => {
      dispatch(executeAction(GET_WIDGETS_LOADING, false));
      dispatch(executeAction(GET_WIDGETS_SUCCESS, jsonExample));
    }, 2500);
    // return fetch(`${API_ROOT_URL}/widgets`)
    //   .then(response => response.json())
    //   .then((response) => {
    //     dispatch(executeAction(GET_WIDGETS_LOADING, false));
    //     dispatch(executeAction(GET_WIDGETS_SUCCESS, response));
    //   })
    //   .catch((error) => {
    //     dispatch(executeAction(GET_WIDGETS_LOADING, false));
    //     dispatch(executeAction(GET_WIDGETS_FAILURE, error));
    //   });
  };
}
