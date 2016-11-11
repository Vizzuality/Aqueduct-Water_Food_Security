const API_ROOT_URL = 'https://jsonplaceholder.typicode.com';

/**
 * GET POSTS
*/
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';
export const GET_POSTS_LOADING = 'GET_POSTS_LOADING';

/**
 * GET POST
*/
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';
export const GET_POST_LOADING = 'GET_POST_LOADING';

/**
 * EXECUTE ACTION
*/
export function executeAction(type, payload) {
  return { type, payload };
}


/**
 * ACTIONS
*/
export function getPosts() {
  return (dispatch) => {
    dispatch(executeAction(GET_POSTS_LOADING, true));
    return fetch(`${API_ROOT_URL}/posts`)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        dispatch(executeAction(GET_POSTS_LOADING, false));
        dispatch(executeAction(GET_POSTS_SUCCESS, response));
        dispatch(executeAction(GET_POSTS_LOADING, false));
      })
      .catch((error) => {
        console.log(error);
        dispatch(executeAction(GET_POSTS_LOADING, false));
        dispatch(executeAction(GET_POSTS_FAILURE, error));
      });
  };
}

export function getPost(id) {
  return (dispatch) => {
    dispatch(executeAction(GET_POST_LOADING, true));

    return fetch(`${API_ROOT_URL}/posts/${id}`)
      .then(response => response.json())
      .then((response) => {
        dispatch(executeAction(GET_POST_LOADING, false));
        dispatch(executeAction(GET_POST_SUCCESS, response));
        dispatch(executeAction(GET_POST_LOADING, false));
      })
      .catch((error) => {
        dispatch(executeAction(GET_POST_LOADING, false));
        dispatch(executeAction(GET_POST_FAILURE, error));
      });
  };
}
