import fetchJsonp from 'fetch-jsonp';

const GET_SHARE_SUCCESS = 'GET_SHARE_SUCCESS';
const GET_SHARE_ERROR = 'GET_SHARE_ERROR';
const GET_SHARE_LOADING = 'GET_SHARE_LOADING';

const initialState = {
  url: '',
  loading: false,
  error: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SHARE_SUCCESS:
      return Object.assign({}, state, { url: action.payload, loading: false, error: false });
    case GET_SHARE_ERROR:
      return Object.assign({}, state, { error: action.payload, loading: false });
    case GET_SHARE_LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    default:
      return state;
  }
}

export function getShareUrl(url) {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_SHARE_LOADING });

    fetchJsonp(`https://api-ssl.bitly.com/v3/shorten?longUrl=${encodeURIComponent(url)}&login=${config.BITLY_LOGIN}&apiKey=${config.BITLY_KEY}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.status_txt);
      })
      .then((json) => {
        if (!json.data.url) {
          dispatch({ type: GET_SHARE_ERROR, payload: json.status_txt });
          throw new Error('BITLY doesn\'t allow localhost alone as domain, use localhost.lan for example');
        } else {
          dispatch({ type: GET_SHARE_SUCCESS, payload: json.data.url });
        }
      })
      .catch((err) => {
        console.error('parsing failed', err);
      });
  };
}
