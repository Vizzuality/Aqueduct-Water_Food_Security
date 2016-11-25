import { push } from 'react-router-redux';

export function setMapUrl() {
  return (dispatch, state) => {
    const params = state().map;
    const url = `${params.zoom}/${params.latLng.lat}/${params.latLng.lng}`;
    dispatch(push(`/${url}`));
  };
}
