import { Deserializer } from 'jsonapi-serializer';
import { store } from 'main';
import { SET_EMBED, GET_WIDGET_SUCCESS, GET_WIDGET_ERROR } from 'constants/embed';

const deserializer = new Deserializer({ keyForAttribute: 'camelCase' });

export function setEmbed(embed) {
  return {
    type: SET_EMBED,
    payload: embed
  };
}

export function getWidget() {
  return (dispatch) => {
    const state = store.getState();
    fetch(`${config.API_URL}/dataset/${state.embed.id}?app=aqueduct&includes=widget`)
      .then(res => res.json())
      .then((data) => {
        deserializer.deserialize(data, (err, widgetData) => {
          if (err) throw new Error('Error deserializing json api');
          if (!widgetData.widget.length) return;

          dispatch({
            type: GET_WIDGET_SUCCESS,
            payload: widgetData.widget[0].attributes
          });
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
