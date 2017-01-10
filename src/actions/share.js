import fetchJsonp from 'fetch-jsonp';

import {
  GET_SHARE_SUCCESS,
  GET_SHARE_ERROR,
  GET_SHARE_LOADING
}
from 'constants/share';

export function getShareUrl(url) {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_SHARE_LOADING });

    fetchJsonp(`https://api-ssl.bitly.com/v3/shorten?longUrl=${encodeURIComponent(url)}&login=o_7jgk3fc9jd&apiKey=R_15709bbeafa545cbb6a62de75605897e`)
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
        console.log('parsing failed', err);
      });
  };
}
