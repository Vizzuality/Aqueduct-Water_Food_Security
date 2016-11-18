import { push } from 'react-router-redux';

export function updateURL() {
  return (dispatch, state) => {
    const params = state().map;
    const url = `${params.latLng.lat}/${params.latLng.lng}/${params.zoom}`;
    dispatch(push(`/${url}`));
  };
}
