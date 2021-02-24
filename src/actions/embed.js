import axios from 'axios';
import WRISerializer from 'wri-json-api-serializer';
import { store } from 'main';
import { SET_EMBED, GET_WIDGET_SUCCESS, GET_WIDGET_ERROR } from 'constants/embed';

export function setEmbed(embed) {
  return {
    type: SET_EMBED,
    payload: embed
  };
}

export function getWidget() {
  return (dispatch) => {
    const state = store.getState();
    axios.get(`${config.API_URL}/dataset/${state.embed.id}?application=aqueduct&includes=widget`)
      .then(({ data }) => {
        const dataSerialized = WRISerializer(data);
        dispatch({
          type: GET_WIDGET_SUCCESS,
          payload: dataSerialized.widget.length ? dataSerialized.widget[0] : null
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_WIDGET_ERROR,
          payload: err.message
        });
      });
  };
}
