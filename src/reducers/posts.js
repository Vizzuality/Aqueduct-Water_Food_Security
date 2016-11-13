import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  GET_POSTS_LOADING,
  GET_POST_LOADING,
  GET_POST_SUCCESS,
  GET_POST_FAILURE
} from '../actions/posts';

const initialState = {
  postsLoading: true,
  postsList: [],
  postsDetail: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_LOADING:
      return Object.assign({}, state, { postsLoading: action.payload });
    case GET_POSTS_SUCCESS:
      return Object.assign({}, state, { postsList: action.payload });
    case GET_POSTS_FAILURE:
      return Object.assign({}, state, { postsError: action.payload });


    case GET_POST_LOADING:
      return Object.assign({}, state, { postLoading: action.payload });
    case GET_POST_SUCCESS:
      const postsDetail = state.postsDetail;
      postsDetail[action.payload.id] = action.payload;

      return Object.assign({}, state, { postsDetail });
    case GET_POST_FAILURE:
      return Object.assign({}, state, { postError: action.payload });

    default:
      return state;
  }
}
