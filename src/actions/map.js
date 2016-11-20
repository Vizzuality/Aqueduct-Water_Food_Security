export const SET_MAP_LOCATION = 'SET_MAP_LOCATION';

export function setMapLocation(locationParams) {
  return {
    type: SET_MAP_LOCATION,
    payload: locationParams
  };
}
