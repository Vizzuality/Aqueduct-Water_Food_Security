import {
  GET_WIDGETS_SUCCESS,
  GET_WIDGETS_FAILURE,
  GET_WIDGETS_LOADING
} from 'actions/widgets';

const initialState = {
  widgetsLoading: true,
  widgetsList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WIDGETS_LOADING:
      return Object.assign({}, state, { widgetsLoading: action.payload });
    case GET_WIDGETS_SUCCESS:
      return Object.assign({}, state, { widgetsList: action.payload });
    case GET_WIDGETS_FAILURE:
      return Object.assign({}, state, { widgetsError: action.payload });
    default:
      return state;
  }
}
