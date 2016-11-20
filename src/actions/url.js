import { push } from 'react-router-redux';

function parseParams(params) {
  const newParams = params || {};

  if (newParams.latLng) {
    newParams.latLng = {
      lat: params.latLng.lat.toFixed(2),
      lng: params.latLng.lng.toFixed(2)
    };
  }
  return params;
}


export function setMapUrl() {
  return (dispatch, state) => {
    const params = parseParams(state().map);

    const url = `${params.zoom}/${params.latLng.lat}/${params.latLng.lng}`;
    dispatch(push(`/${url}`));
  };
}
